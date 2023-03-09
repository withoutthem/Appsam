const {checkJWT} = require('./jwtController');
const {logEvents} = require('../middleware/logger');

// /api/auth/jwt 로 get요청 시 

const jwtValidator = (req, res)=>{
    if(req.headers.cookie && req.headers.cookie.length > 0){
    //jwt가 있는 경우 검사
    const nowJWT = req.headers.cookie.substring(4);
    checkJWT(nowJWT)
    .then(result=>{
        res.send({stat:true, isValidJWT : true, message: '토큰 검증 성공입니다.', result :result})
    })
    .catch(error =>{
        logEvents(`${error}유효하지 않은 토큰 접근\t${req.url}\t${req.headers.origin}`,'errLog.log')
        res.status(401).send({stat: false, message: '유효하지 않은 토큰입니다.', etc: error});
    })
    }
    else{
        //jwt가 없는 경우  
        res.send({stat: false, message: '토큰이 없습니다. 로그인을 해주세요.', etc:'No token'}) 
    }
}

module.exports = { jwtValidator }

