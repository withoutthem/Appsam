const User = require('../models/User');
const bcrypt = require('bcrypt');
const { logEvents } = require('../middleware/logger');

// 해시함수로 암호화하여 스키마 생성 후 저장하는 함수
const createUserData = async ({id, ps, name, email, aors})=>{ 
    try{
        const encryptedPS = await bcrypt.hash(ps[0].toString(),10)
        const user = new User({id:id[0], ps:encryptedPS, name : name[0], email : email[0], aors: aors[0]}); //schema에 집어넣기
        await user.save();
    }
    catch(e){
        throw new Error(e + '생성')
    }
}

//메인 로직
const signUp = async (req, res, next)=>{
    try{
        await User.find({id : req.body['id'][0]}) //db에서 id 중복값 찾기
        .then((result)=>{
            if(result[0]){ //찾은 값이 있으면
                throw new Error('중복값'); //걍 에러 밖에 던져버림
            }
            else{ //중복값이 없으면
                createUserData(req.body); //새 유저 db 생성
                res.status(201).send('생성 success') //성공
            }
        })
    }
    catch(err){ 
        res.status(409).send(err + '에러일걸요?'); //던진 에러 받아서 에러 보내기
        logEvents(`${err}\t${req.url}\t${req.headers.origin}`,'errLog.log') //에러 로그에 기본적인거만 저장
    }
}

module.exports = {signUp};