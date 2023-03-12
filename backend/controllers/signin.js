const User = require('../models/User');
const bcrypt = require('bcrypt');
const { logEvents } = require('../middleware/logger');
const { createJWT } = require('../utils/jwtController');

// Sign In 메인 로직
const signIn = (req, res ,next) =>{
    try{
        User.findOne({id : req.body.id}) //아이디 찾음
        .then((result) =>{
            if(result){ //결과 있으면
                bcrypt.compare(req.body.ps , result.ps, (err, same) => { //bcrypt로 클라이언트가 입력한 ps와 db의 해시ps를 비교함
                    if(err){ //알 수 없는 에러 발생 시 
                        logEvents(`${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`,'errLog.log')
                        res.status(401).send({stat: false, message: '알 수 없는 에러입니다.', etc : 'unAuthorized'});
                        return // 중지
                    }
                    if(same){ // ps 일치할 경우
                        const userData = {id : result.id, email:result.email, name : result.name, aors: result.aors} // db 기반으로 userData 생성
                        createJWT(userData) //userData를 기반으로 jwt 생성
                        .then((token)=>{ 
                            res.status(200).send({
                                stat: true, 
                                message: '로그인 성공', 
                                etc: 'Authorized', 
                                jwt: token, 
                                userInfo : {id : result.id, email :result.email, name : result.name, aors : result.aors} //jwt토큰과 userInfo를 보내줌
                            })
                        })
                        .catch(err => {
                            res.status(501).send({stat:false, message: '토큰생성 에러입니다. 마음이 아픕니다.'}); // jwt생성 도중 발생한 에러
                            logEvents(`${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`,'errLog.log') //에러 로그에 기본적인거만 저장
                        })
                    }
                    else{ // ps 불일치
                        res.status(401).send({stat:false, message : '비밀번호가 맞지 않습니다.', etc: 'unAuthorized'})
                    }
                })
            }
            else{ //id 불일치
                res.status(401).send({stat : false, message: '아이디가 없습니다.', etc: 'unAuthorized'})
            }
        })
    }
    catch(e){
        res.status(500).send({stat: false, message: '서버 에러입니다.'});
        logEvents(`${e}\t${req.url}\t${req.headers.origin}\t ${req.ip}`,'errLog.log');
    }
}

module.exports = {signIn};