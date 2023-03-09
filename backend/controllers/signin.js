const User = require('../models/User');
const bcrypt = require('bcrypt');
const { logEvents } = require('../middleware/logger');
const {createJWT} = require('../utils/jwtController');

const signIn = (req, res ,next) =>{
    try{
        User.findOne({id : req.body.id})
        .then((result) =>{
            if(result){
                bcrypt.compare(req.body.ps , result.ps, (err, same) => {
                    //알 수 없는 에러 발생 시 
                    if(err){ 
                        logEvents(`${err}\t${req.url}\t${req.headers.origin}`,'errLog.log')
                        res.status(401).send({stat: false, message: '알 수 없는 에러입니다.', etc : 'unAuthorized'});
                        return
                    }
                    // id / ps 일치 확인 
                    if(same){
                        const userData = {id : result.id, name : result.name, aors: result.aors}
                        const jwt = ''
                        createJWT(userData)
                        .then((token)=>{
                            res.status(200).send({
                                stat: true, 
                                message: '로그인 성공', 
                                etc: 'Authorized', 
                                jwt: token, 
                                userInfo : {id : result.id, email :result.email, name : result.name, aors : result.aors}
                            })
                        })
                        .catch(err => console.log(err))
                    }
                    // ps 불일치
                    else{
                        res.status(401).send({stat:false, message : '비밀번호가 맞지 않습니다.', etc: 'unAuthorized'})
                    }
                })
            }
            //id 불일치
            else{
                res.status(401).send({stat : false, message: '아이디가 없습니다.', etc: 'unAuthorized'})
            }
        })
    }
    catch(e){
        res.status(500).send({stat: false, message: '서버 에러입니다.'});
        logEvents(`${e}\t${req.url}\t${req.headers.origin}`,'errLog.log');
    }
}

module.exports = {signIn};