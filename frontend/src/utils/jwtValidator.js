import axios from 'axios';
//페이지 이동 활동 등에 사용하는 jwt토큰 validate 요청 모듈

const jwtValidator = ()=>{
    return new Promise((resolve, reject)=>{
        axios.get('/api/auth/jwt') //헤더에서 토큰 뽑아서 체크만 하는 uri
        .then(result => {
            if(result.data.stat === true && result.data.isValidJWT === true){ //토큰 정상
                console.log('토큰 유효 검증 성공');
                resolve(result.data.result) //resolve
            }
            else if(result.data.stat === false && result.data.etc === 'No token'){ // 토큰 없음
                console.log('토큰 없음')
                reject({stat:false, message: '로그인이 필요합니다.', etc:'No token'}); //reject
            }
            else{ //이외 에러
                reject({stat:false, message: '알 수 없는 에러입니다. 뭐죠?'}) //reject
            }
        }) 
        .catch(e => { //토큰이 유효하지 않은 경우(401을 받음)
            reject({stat: false, message: '유효하지 않은 토큰입니다.'}) //reject
        })
    })
}

export { jwtValidator };
