const User = require('../models/User');
const bcrypt = require('bcrypt');
const { logEvents } = require('../middleware/logger');
const { createJWT } = require('../utils/jwtController');

// 해시함수로 암호화하여 스키마 생성 후 저장하는 함수
const createUserData = async ({id, ps, name, email, aors})=>{ 
    try{
        const encryptedPS = await bcrypt.hash(ps[0].toString(),10)
        const user = new User({id:id[0], ps:encryptedPS, name : name[0], email : email[0], aors: aors[0]}); //schema에 집어넣기
        await user.save();
        const userInfo = {id: id, name : name, email:email, aors:aors} //userInfo를 만들어서 리턴해준다.
        return userInfo;
    }
    catch(e){
        throw new Error(e + '생성')
    }
}

//메인 로직
const signUp = async (req, res, next)=>{
    try{
        await User.find( //중복되는 id 혹은 email이 존재하는 경우
            {
                $or: [
                  { id : req.body['id'][0] },
                  { email : req.body['email'][0] }
                ]
              }
        ) //db에서 id 중복값 찾기
        .then( (result)=>{
            if(result[0]){ //찾은 값이 있으면
                res.status(409).send({stat:false, message: '이미 처리된 요청입니다. 서버에서 중복이 발생했습니다.'})
                const error = new Error('서버에서 중복값 에러가 발생했습니다. 공격자일 수 있습니다.')
                logEvents(`${error}\t${req.url}\t${req.headers.origin}`,'errLog.log') //에러 로그에 기본적인거만 저장
            }
            else{ //중복값이 없으면
                 createUserData(req.body) //새 유저 db 생성
                 .then((userInfo)=>{
                    const jwtInfo = {id: userInfo.id[0], email : userInfo.email[0], name : userInfo.name[0], aors: userInfo.aors[0]}
                    createJWT(jwtInfo)
                    .then(token =>{
                        res.status(201).send({stat:true, message:'생성에 성공했습니다', userInfo : jwtInfo, jwt: token})
                    })
                    .catch(e => res.status(501).send({stat:false, message: '토큰생성 에러입니다. 마음이 아픕니다.'}))
                 })
                // jwt용 데이터 가공 및 발급
                // const jwtInfo = {id : req.body.id[0], email:req.body.email[0], name : req.body.name[0], aors: req.body.aors[0]};
                //  createJWT(jwtInfo).then(token => {
                //     res.status(201).send({stat:true, message:'생성에 성공했습니다.', userInfo : jwtInfo, jwt: token})
                // })
                .catch(e => {
                    res.status(501).send({stat:false, message: '서버 데이터 생성 오류입니다 마음이 아프네요.'})
                })
            }
        })
    }
    catch(err){ 
        res.status(409).send(err + '에러일걸요?'); //던진 에러 받아서 에러 보내기
        logEvents(`${err}\t${req.url}\t${req.headers.origin}`,'errLog.log') //에러 로그에 기본적인거만 저장
    }
}

module.exports = {signUp};