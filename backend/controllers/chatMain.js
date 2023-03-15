const ChatApp = require('../models/ChatApp')
const ChatSam = require('../models/ChatSam')
const User = require('../models/User')
const { chatMainJwtValidatorToID } = require('../utils/chatMainJwtValidatorToID')
const { logEvents } = require('../middleware/logger');
const pageSize = 4


//인기순
// /api/chatmain/:type/popular/:count
const popular = async (req, res, next) =>{ 
    const type = req.params.type || 'none';
    const count = req.params.count || 0;
    const nowMyId = await chatMainJwtValidatorToID(req)

    //애플타입 챗
    if(type === 'app'){
        try{
            let nowDataApp = await ChatApp.find({}).sort({ like: -1 }).skip(count * pageSize).limit(pageSize);
            if(nowDataApp.length === 0){ //데이터가 없는 경우
                res.send({stat:false, message: '데이터가 더 이상 없습니다.', etc:'No Data'})
            }
            else{
                nowDataApp = nowDataApp.map(doc => {
                    const obj = doc.toObject(); // Mongoose Document를 일반 JS 객체로 변환
                    obj.isLike = obj.likes.includes(nowMyId); // isLike 속성 추가
                    return obj;
                });
                res.send({stat:true, data:nowDataApp})
            }
        }
        catch(err){
            logEvents(`${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
            res.status(500).send({stat:false, message:'서버 에러입니다. 다음번에는 좀 잘해보겠습니다.', e:err})
        }
    }
    //삼성타입 챗
    else if(type === 'sam'){
        try{
            let nowDataSam = await ChatSam.find({}).sort({ like: -1 }).skip(count * pageSize).limit(pageSize);
            if(nowDataSam.length === 0){ //데이터가 없는 경우
                res.send({stat:false, message: '데이터가 더 이상 없습니다.', etc:'No Data'})
            }
            else{
                nowDataSam = nowDataSam.map(doc => {
                    const obj = doc.toObject(); // Mongoose Document를 일반 JS 객체로 변환
                    obj.isLike = obj.likes.includes(nowMyId); // isLike 속성 추가
                    return obj;
                });
                res.send({stat:true, data:nowDataSam})
            }
        }
        catch(err){
            logEvents(`${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
            res.status(500).send({stat:false, message:'서버 에러입니다. 다음번에는 좀 잘해보겠습니다.', e:err})
        }
    }
    else{
        logEvents(`${e}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
        res.status(404).send({stat:false, message: '요청이 잘못되었습니다. 파라미터 에러입니다. 정상적인 요청을 해주세요.'})
    }
}

// 최근순
// /api/chatmain/:type/recent/:count
const recent = async (req, res)=>{ 
    const type = req.params.type || 'none';
    const count = req.params.count || 0;
    const nowMyId = await chatMainJwtValidatorToID(req)

    if(type === 'app'){
        try{
            let nowDataApp = await ChatApp.find({}).sort({ createdAt: -1 }).skip(count * pageSize).limit(pageSize);
            if(nowDataApp.length === 0){ //데이터가 없는 경우
                res.send({stat:false, message: '데이터가 더 이상 없습니다.', etc:'No Data'})
            }
            else{
                nowDataApp = nowDataApp.map(doc => {
                    const obj = doc.toObject(); // Mongoose Document를 일반 JS 객체로 변환
                    obj.isLike = obj.likes.includes(nowMyId); // isLike 속성 추가
                    return obj;
                });
                res.send({stat:true, data:nowDataApp})
            }
        }
        catch(err){
            logEvents(`${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
            res.status(500).send({stat:false, message:'서버 에러입니다. 다음번에는 좀 잘해보겠습니다.', e:err})
        }
    }
    else if(type === 'sam'){
        try{
            let nowDataSam = await ChatSam.find({}).sort({ createdAt: -1 }).skip(count * pageSize).limit(pageSize);
            if(nowDataSam.length === 0){ //데이터가 없는 경우
                res.send({stat:false, message: '데이터가 더 이상 없습니다.', etc:'No Data'})
            }
            else{
                nowDataSam = nowDataSam.map(doc => {
                    const obj = doc.toObject(); // Mongoose Document를 일반 JS 객체로 변환
                    obj.isLike = obj.likes.includes(nowMyId); // isLike 속성 추가
                    return obj;
                });
                res.send({stat:true, data:nowDataSam})
            }
        }
        catch(err){
            logEvents(`${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
            res.status(500).send({stat:false, message:'서버 에러입니다. 다음번에는 좀 잘해보겠습니다.', e:err})
        }
    }
    else{
        logEvents(`${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
        res.status(404).send({stat:false, message: '요청이 잘못되었습니다. 파라미터 에러입니다. 정상적인 요청을 해주세요.'})
    }
}

// api/chatmain/app/post, {type:'chatApp' or 'chatSam', text:내용, id: redux에 있는 id,} 
// -> 응답: 수정 성공 시 dbPost, {stat:true, message:'댓글 포스팅 성공'} 
// -> global SnackBar에 메시지 띄우기

const chatPost = async (req, res, next)=>{

    //jwt 검증 -> type찾아서 post접근 -> text내용 스키마 만들어서 포스팅 -> 완료응답
    try{
        const nowMyId = await chatMainJwtValidatorToID(req); // jwt 검증해서 id로 만들기
    
        if(nowMyId.stat === false){ // jwt 유효하지 않은 경우
            res.status(401).send(nowMyId);
        }
        else{
            const type = req.body.type;
            const userData = await User.findOne({id : nowMyId})
            if(!userData){
                res.status(401).send({stat:false, message: '이런 회원이 없는데요'})
            }
            else{
                if(type ==='chatApp'){
                    const nowPost = new ChatApp({
                        type : type,
                        id: userData.id,
                        profile_img: userData.profile_img,
                        aors : userData.aors,
                        text : req.body.text,
                        like : 0,
                        likes : []
                    });
                    await nowPost.save();
                    res.status(201).send({stat:true, message:'댓글 포스팅 완료되었습니다.'})
                }
                else if(type === 'chatSam'){
                        const nowPost = new ChatSam({
                            type : type,
                            id: userData.id,
                            profile_img: userData.profile_img,
                            aors : userData.aors,
                            text : req.body.text,
                            like : 0,
                            likes : []
                        });
                        await nowPost.save();
                        res.status(201).send({stat:true, message:'댓글 포스팅 완료되었습니다.'})
                    }
                else{
                    logEvents(`${e}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
                    res.status(404).send({stat:false, message:'타입이 잘못됬다옹. 요청을 잘못보냈다옹.'})
                }
            }
        }
    }
    catch(err){
        logEvents(`${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
        res.status(500).send({stat:false, message:'예상치도 못한 에러가 발생했는데요. 다음번에는 좀 잘해보겠습니다.'})
    }
}


module.exports = {popular, recent, chatPost}