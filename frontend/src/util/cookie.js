import { Cookies } from 'react-cookie'

const cookies = new Cookies();

// 쿠키 생성, 저장
const setCookie = (name, value, option)=>{
    return cookies.set(name, value, {...option})
}

// 겟쿠키
const getCookie = (name)=>{
    return cookies.get(name)
}

export { setCookie, getCookie };
