import axios from 'axios';
//페이지 이동 활동 등에 사용하는 jwt토큰 validate 요청 모듈

const jwtValidator = (callback1, callback2)=>{
    return new Promise((resolve, reject)=>{
        axios.get('/api/auth/jwt')
        .then(result => {
            if(result.data.stat === true && result.data.isValidJWT === true){
                console.log('토큰 유효 검증 성공');
                resolve(true)
            }
            else if(result.data.stat === false && result.data.etc === 'No token'){
                reject(false);
                callback1();
            }
            else{
                console.log('알 수 없는 에러')
                reject(false)
            }
        })
        .catch(e => { //토큰이 유효하지 않은 경우
            alert(e.response.data.message ? e.response.data.message : e); 
            callback2()
        })
    })
}

export { jwtValidator };
