const {checkJWT} = require('./jwtController')

//요청객체 넣으면 jwt를 검사해 아이디를 리턴해주는 함수
const chatMainJwtValidatorToID = async (req) => { 
    try {
      if (req.headers.cookie && req.headers.cookie.length > 0) { //jwt가 있는 경우 검사
        const nowJWT = req.headers.cookie.substring(4); // 쿠키에서 토큰 파싱
        const result = await checkJWT(nowJWT); // 쿠키 검증
        return result.id //나의 아이디를 리턴
      } else { //jwt 없는 경우
        return {stat:false, message: 'jwt가 없습니다.'}
      }
    } catch (error) {
        console.log(error + '에러네요')
      return {stat:false, message:'유효하지 않은 토큰입니다.'} // unAuthorized
    }
}

module.exports = { chatMainJwtValidatorToID }