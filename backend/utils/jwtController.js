const jwt = require('jsonwebtoken')
const { logEvents } = require('../middleware/logger');
require("dotenv").config();
const secretKey = process.env.SECRET;
const options = {expiresIn: '3d', issuer: 'VictorLeeAdmin', subject: 'userInfo'};

// token check
const checkJWT = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, secretKey, (err, decoded)=>{
            if(err){
                logEvents(`${err}\t 유효하지 않은 토큰 에러입니다. `,'errLog.log');
                reject(err)
            }
            else{
                return resolve(decoded)
            }
        })
    })
}

// create 
const createJWT = (info)=>{
    return new Promise((resolve, reject) =>{
        jwt.sign(info, secretKey, options, (err, token)=>{ //jwt.sign은 비동기 함수이다.
            if (err){
                logEvents(`${err}\t 토큰 생성 중 발생한 에러입니다. `,'errLog.log')
                reject(err);
            }
            else resolve(token)
        })
    })
}

module.exports = {checkJWT, createJWT};