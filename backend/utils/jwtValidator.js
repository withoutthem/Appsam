const {checkJWT} = require('./jwtController');
const {logEvents} = require('../middleware/logger');

// /api/auth/jwt 로 get요청 시 토큰 validation
const jwtValidator = (req, res)=>{
    if(req.headers.cookie && req.headers.cookie.length > 0){ //jwt가 있는 경우 검사
        const nowJWT = req.headers.cookie.substring(4); // 쿠키에서 토큰 파싱
        checkJWT(nowJWT) // 쿠키 검증
        .then(result=>{
            const jwtInfo = {id: result.id, email : result.email, name : result.name, aors: result.aors} // 토큰정보 가공
            res.send({stat:true, isValidJWT : true, message: '토큰 검증 성공입니다.', result :jwtInfo}) //검증 성공
        })
        .catch(error =>{
            logEvents(`${error}유효하지 않은 토큰 접근\t${req.url}\t${req.headers.origin}`,'errLog.log')
            res.status(401).send({stat: false, message: '유효하지 않은 토큰입니다.', etc: error}); // unAuthorized
        })
    }
    else{ //jwt 없는 경우
        res.send({stat: false, message: '토큰이 없습니다. 로그인을 해주세요.', etc:'No token'}) 
    }
}

module.exports = { jwtValidator }

