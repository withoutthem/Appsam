import { Cookies } from 'react-cookie';
let now = new Date();
const expires = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 현재 시간에서 3일 후의 시간
const options = {
    path : '/',
    expires: expires,
    // httpOnly: true 배포 시 true 테스트 할 것.
}

// cookies.js 파일
const cookies = new Cookies();

//무적권 jwt 쿠키 가져오기
export const getCookieJWT = () => {
  return cookies.get('jwt');
};

// 무적권 jwt만 세팅하는 셋쿠키
export const setCookieJWT = (value) => {
  cookies.set('jwt', value, options);
};

// 쿠키 제거하기
export const removeCookie = (name, options) => {
  cookies.remove(name, options);
};

// 무적권 jwt쿠키 없애기
export const removeCookieJWT = ()=>{
  cookies.remove('jwt');
}