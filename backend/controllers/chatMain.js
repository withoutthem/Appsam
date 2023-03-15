const ChatApp = require('../models/ChatApp')
const ChatSam = require('../models/ChatSam')
const { chatMainJwtValidatorToID } = require('../utils/chatMainJwtValidatorToID')
const pageSize = 4

// /api/chatmain/:type/popular/:count
const popular = async (req, res, next) =>{ //인기순
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
                console.log(nowDataApp)
                res.send({stat:true, data:nowDataApp})
            }
        }
        catch(err){
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
            console.log(err)
            res.status(500).send({stat:false, message:'서버 에러입니다. 다음번에는 좀 잘해보겠습니다.', e:err})
        }
    }
    else{
        res.status(404).send({stat:false, message: '요청이 잘못되었습니다. 파라미터 에러입니다. 정상적인 요청을 해주세요.'})
    }
}


// /api/chatmain/:type/recent/:count
const recent = async (req, res)=>{ // 최근순
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
            console.log(err)
            res.status(500).send({stat:false, message:'서버 에러입니다. 다음번에는 좀 잘해보겠습니다.', e:err})
        }
    }
}

module.exports = {popular, recent}