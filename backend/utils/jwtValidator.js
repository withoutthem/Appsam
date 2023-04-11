const { checkJWT } = require('./jwtController');
const { logEvents } = require('../middleware/logger');

// /api/auth/jwt 로 get요청 시 토큰 validation
const jwtValidator = async (req, res) => {
  try {
    if (req.headers.cookie && req.headers.cookie.length > 0) { //쿠키가 있는 경우 검사
      const jwtCookieRegex = /jwt=([^;]+)/;
      const match = req.headers.cookie.match(jwtCookieRegex);
      if(!match){
        throw {stat:false, message:'jwt쿠키가 없습니다'}
      }
      const nowJWT = match[1];
      const result = await checkJWT(nowJWT); // 쿠키 검증

      const jwtInfo = { id: result.id, email: result.email, name: result.name, aors: result.aors }; // 토큰 정보 가공
      res.send({ stat: true, isValidJWT: true, message: '토큰 검증 성공입니다.', result: jwtInfo }); //검증 성공
    } else { //jwt 없는 경우
      res.send({ stat: false, message: '쿠키/토큰이 없습니다. 로그인을 해주세요.', etc: 'No token' });
    }
  } catch (error) {
    logEvents(`${error}유효하지 않은 토큰 접근\t${req.url}\t${req.headers.origin}\t ${req.ip}`, 'errLog.log');
    res.status(401).send({ stat: false, message: error.message, etc: error }); // unAuthorized
  }
}

module.exports = { jwtValidator };