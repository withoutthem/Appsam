const {checkJWT} = require('../utils/jwtController');
const {logEvents} = require('../middleware/logger');

const authTest = (req, res)=>{
    const nowJWT = req.headers.cookie.substring(4)
    
    checkJWT(nowJWT)
    .then(result=>{
        res.send({stat:true, isValidJWT : true, message: '토큰 검증 성공입니다.', result :result})
    })
    .catch(error =>{
        logEvents(`${error}유효하지 않은 토큰 접근\t${req.url}\t${req.headers.origin}`,'errLog.log')
        res.status(401).send({stat: false, message: '유효하지 않은 토큰입니다.', etc: error});
    })
}

module.exports = { authTest }

