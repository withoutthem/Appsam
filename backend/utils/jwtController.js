const jwt = require('jsonwebtoken')
const { logEvents } = require('../middleware/logger');
require("dotenv").config();
const secretKey = process.env.SECRET;
const options = {expiresIn: '3d', issuer: 'VictorLeeAdmin', subject: 'userInfo'};

// token check
const checkJWT = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, secretKey, (err, decoded)=>{ //token 과 Key를 이용해 검증
            if(err){
                logEvents(`${err}\t 유효하지 않은 토큰 에러입니다. `,'errLog.log');
                reject(err)
            }
            else{
                return resolve(decoded) // decoded된 Info를 리턴
            }
        })
    })
}

// create 토큰
//jwt 형식 {id:id, email:email, name:name. aors:aors}
const createJWT = (userInfo)=>{ 
    return new Promise((resolve, reject) =>{
        jwt.sign(userInfo, secretKey, options, (err, token)=>{ //userInfo를 받아 jwtToken 생성
            if (err){
                logEvents(`${err}\t 토큰 생성 중 발생한 에러입니다. `,'errLog.log')
                reject(err);
            }
            else resolve(token) //토큰 발급
        })
    })
}

module.exports = {checkJWT, createJWT};