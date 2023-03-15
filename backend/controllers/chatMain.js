const ChatApp = require('../models/ChatApp')
const ChatSam = require('../models/ChatSam')
const User = require('../models/User')
const { chatMainJwtValidatorToID } = require('../utils/chatMainJwtValidatorToID')
const { logEvents } = require('../middleware/logger');
const pageSize = 4



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//인기순
// /api/chatmain/:type/popular/:count
const popular = async (req, res, next) =>{ 
    const type = req.params.type || 'none';
    const count = req.params.count || 0;
    const nowMyId = await chatMainJwtValidatorToID(req)

    //애플타입 챗
    if(type === 'app'){
        try{
            let nowDataApp = await ChatApp.find({}).sort({ like: -1, createdAt: -1 }).skip(count * pageSize).limit(pageSize);
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
            let nowDataSam = await ChatSam.find({}).sort({ like: -1, createdAt: -1 }).skip(count * pageSize).limit(pageSize);
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
        logEvents(`chatMain-popular에서 ${e}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
        res.status(404).send({stat:false, message: '요청이 잘못되었습니다. 파라미터 에러입니다. 정상적인 요청을 해주세요.'})
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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
        logEvents(`chatMain-recent에서 ${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
        res.status(404).send({stat:false, message: '요청이 잘못되었습니다. 파라미터 에러입니다. 정상적인 요청을 해주세요.'})
    }
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// api/chatmain/app/post, {type:'chatApp' or 'chatSam', text:내용, id: redux에 있는 id,} 
// -> 응답: 수정 성공 시 dbPost, {stat:true, message:'댓글 포스팅 성공'} 
const chatPost = async (req, res, next)=>{

    //jwt 검증 -> type찾아서 post접근 -> text내용 스키마 만들어서 포스팅 -> 완료응답
    try{
        const nowMyId = await chatMainJwtValidatorToID(req); // jwt 검증해서 id로 만들기
    
        if(nowMyId.stat === false){ // jwt 유효하지 않은 경우
            res.status(401).send(nowMyId);
        }
        else{ //jwt 유효한 경우
            const type = req.body.type;
            const userData = await User.findOne({id : nowMyId})
            if(!userData){
                res.status(204).send({stat:false, message: '이런 회원이 없는데요'})
            }
            else{
                if(type ==='chatApp' && req.params.type === 'app'){
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
                else if(type === 'chatSam' && req.params.type === 'sam'){
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
        logEvents(`chatPost에서 ${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
        res.status(500).send({stat:false, message:'예상치도 못한 에러가 발생했는데요. 다음번에는 좀 잘해보겠습니다.'})
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// api/chatmain/:type/update/:ticket , {type: , text:'내용', id:redux에 있는 id} -> 응답 : 수정 성공 시 db 내용 바꿈, {stat:true, message:'수정 성공'} -> global SnackBar에 메시지 띄우기
// :type : app or sam

const chatUpdate = async (req, res, next) => {
    try {
        const ticket = req.params.ticket;
        const type = req.params.type || 'none';
        const nowMyId = await chatMainJwtValidatorToID(req); // jwt 검증해서 id로 만들기

        if (nowMyId.stat === false) { // jwt 유효하지 않은 경우
            res.status(401).send(nowMyId);
        } else { // 유효한 경우
            const userData = await User.findOne({id : nowMyId})
            if(!userData){
                res.status(204).send({stat:false, message: '이런 회원이 없는데요'})
            }
            else{
                if (type === 'app' && req.body.type === 'chatApp') {
                    const post = await ChatApp.findOne({ ticket: ticket });
                    if (post && post.id === nowMyId) {
                        post.text = req.body.text;
                        post.profile_img = userData.profile_img;
                        post.aors = userData.aors;
                        await post.save();
                        res.status(200).send({ stat: true, message: '채팅 수정 완료되었습니다.' });
                    } else {
                        res.status(403).send({ stat: false, message: '채팅 수정 권한이 없습니다.' });
                    }
                } else if (type === 'sam' && req.body.type === 'chatSam') {
                    const post = await ChatSam.findOne({ ticket: ticket });
    
                    if (post && post.id === nowMyId) {
                        post.text = req.body.text;
                        post.profile_img = userData.profile_img;
                        post.aors = userData.aors;
                        await post.save();
                        res.status(200).send({ stat: true, message: '채팅 수정 완료되었습니다.' });
                    } else {
                        res.status(403).send({ stat: false, message: '채팅 수정 권한이 없습니다.' });
                    }
                } else {
                    logEvents(`${e}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
                    res.status(404).send({ stat: false, message: '타입이 잘못됬다옹. 요청을 잘못보냈다옹.' });
                }
            }

        }
    } catch (err) {
        logEvents(`chatUpdate에서 ${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
        res.status(500).send({ stat: false, message: '예상치도 못한 에러가 발생했는데요. 다음번에는 좀 잘해보겠습니다.' });
    }
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api/chatmain/:type/delete/:ticket , {type:'chatApp' or 'chatSam', id:redux에 있는 id} -> 응답 : 삭제 성공 시 db 글 삭제, {stat:true, message:'삭제 성공'} -> global SnackBar에 메시지 띄우기

const chatDelete = async (req, res, next) => {
    try {
        const ticket = req.params.ticket;
        const type = req.params.type || 'none';
        const nowMyId = await chatMainJwtValidatorToID(req); // jwt 검증해서 id로 만들기

        if (nowMyId.stat === false) { // jwt 유효하지 않은 경우
            res.status(401).send(nowMyId);
        } else { // 유효한 경우
            if (type === 'app' && req.body.type === 'chatApp') {
                const post = await ChatApp.findOne({ ticket: ticket });

                if (post && post.id === nowMyId) {
                    await ChatApp.deleteOne({ ticket: ticket });
                    res.status(200).send({ stat: true, message: '채팅 삭제 완료되었습니다.' });
                } else {
                    res.status(403).send({ stat: false, message: '채팅 삭제 권한이 없습니다.' });
                }
            } else if (type === 'sam' && req.body.type === 'chatSam') {
                const post = await ChatSam.findOne({ ticket: ticket });

                if (post && post.id === nowMyId) {
                    await ChatSam.deleteOne({ ticket: ticket });
                    res.status(200).send({ stat: true, message: '채팅 삭제 완료되었습니다.' });
                } else {
                    res.status(403).send({ stat: false, message: '채팅 삭제 권한이 없습니다.' });
                }
            } else {
                res.status(404).send({ stat: false, message: '잘못된 요청 타입입니다. 타입을 확인해주세요.' });
            }
        }
    } catch (err) {
        logEvents(`chatDelete에서 ${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
        res.status(500).send({ stat: false, message: '예상치도 못한 에러가 발생했습니다. 다음번에는 좀 더 잘해보겠습니다.' });
    }
};




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api/chatmain/:type/like/:ticket , {type:'chatApp' or 'chatSam', id:redux에 있는 id} 

const chatLike = async (req, res, next) => {
    try {
        const ticket = req.params.ticket;
        const type = req.params.type || 'none';
        const nowMyId = await chatMainJwtValidatorToID(req); // jwt 검증해서 id로 만들기

        if (nowMyId.stat === false) { // jwt 유효하지 않은 경우
            res.status(401).send(nowMyId);
        } else { // 유효한 경우
            let post;

            if (type === 'app') {
                post = await ChatApp.findOne({ ticket: ticket });
            } else if (type === 'sam') {
                post = await ChatSam.findOne({ ticket: ticket });
            } else {
                res.status(404).send({ stat: false, message: '잘못된 요청 타입입니다.' });
                return;
            }

            if (!post) {
                res.status(404).send({ stat: false, message: '채팅이 존재하지 않습니다.' });
                return;
            }

            const likeIndex = post.likes.indexOf(nowMyId);

            if (likeIndex === -1) { // 좋아요를 누르지 않은 상태
                post.likes.push(nowMyId);
                post.like += 1;
            } else { // 이미 좋아요를 누른 상태
                post.likes.splice(likeIndex, 1);
                post.like -= 1;
            }

            await post.save();
            res.status(200).send({ stat: true, message: '좋아요 상태가 변경되었습니다.' });
        }
    } catch (err) {
        console.error(`likePost에서 ${err}`);
        res.status(500).send({ stat: false, message: '예상치 못한 에러가 발생했습니다. 다음 번에는 잘 해보겠습니다.' });
    }
};


module.exports = {popular, recent, chatPost, chatUpdate, chatDelete, chatLike}