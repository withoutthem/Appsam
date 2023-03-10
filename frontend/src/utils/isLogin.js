import axios from 'axios';
//페이지 이동 활동 등에 사용하는 jwt토큰 validate 요청 모듈

const jwtValidator = ()=>{
    return new Promise((resolve, reject)=>{
        axios.get('/api/auth/jwt')
        .then(result => {
            if(result.data.stat === true && result.data.isValidJWT === true){
                console.log('토큰 유효 검증 성공');
                resolve(result.data.result)
            }
            else if(result.data.stat === false && result.data.etc === 'No token'){
                console.log('토큰 없음')
                reject({stat:false, message: '로그인이 필요합니다.', etc:'No token'});
            }
            else{
                reject({stat:false, message: '알 수 없는 에러입니다. 뭐죠?'})
            }
        }) 
        .catch(e => { //토큰이 유효하지 않은 경우(401을 받음)
            reject({stat: false, message: '유효하지 않은 토큰입니다.'})
        })
    })
}

export { jwtValidator };
