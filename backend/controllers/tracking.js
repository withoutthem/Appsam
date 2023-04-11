const {checkJWT} = require('../utils/jwtController')
const Daily = require('../models/tracking');
const { userRecord } = require('../utils/userRecord')

// 회원의 방문확인 트래킹
const firstSession = async (req, res, next) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  try{
    //jwt 검사. 
    if(req.headers.cookie && req.headers.cookie.length > 0) { //jwt가 있는 경우 검사
      const jwtCookieRegex = /jwt=([^;]+)/;
      const match = req.headers.cookie.match(jwtCookieRegex);
      if(match) {
        const nowJWT = match[1]; // 쿠키에서 토큰 파싱
        const isValidToken = await checkJWT(nowJWT) // 쿠키 검증
        if(isValidToken.id) { //토큰이 있는 경우
          userRecord(isValidToken.id) //방문기록 저장
        } else { //유효하지 않은 토큰인 경우
          console.log('토큰이 유효하지 않음');
        }
      } else { //jwt 없는 경우
        console.log('토큰이 없음');
      }
    } else { //jwt 없는 경우
      console.log('토큰이 없음');
    }
    //없을 경우 ip 저장
    //있을 경우 jwt에 맞는 id를 찾아서 저장한다.
  } catch(e) {
    console.log(e);
  }
}

module.exports = {firstSession};