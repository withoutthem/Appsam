const User = require('../models/User');
const bcrypt = require('bcrypt');
const { logEvents } = require('../middleware/logger');
const { createJWT } = require('../utils/jwtController');
const { userRecord } = require('../utils/userRecord');

// 해시함수로 암호화하여 스키마 생성 후 저장하는 함수
const createUserData = async ({id, ps, name, email, aors})=>{ 
    if (!id || !ps || !name || !email || !aors) {
      throw new Error("모든 필수 필드가 제공되어야 합니다.");
    }
    try{
        const encryptedPS = await bcrypt.hash(ps[0].toString(),10) //bcrypt 암호화
        const user = new User({id:id[0], ps:encryptedPS, name : name[0], email : email[0], aors: aors[0]}); //schema에 집어넣기
        await user.save(); // mongoose 저장
        const userInfo = {id: id, name : name, email:email, aors:aors} //userInfo를 만들어서 리턴해준다.
        return userInfo;
    }
    catch(e){
        throw new Error(e + '생성') //에러 집어던지기
    }
}

// Sign Up 메인 로직
const signUp = async (req, res, next)=>{
  try{
      const result = await User.find({
          $or: [
            { id : req.body['id'][0] },
            { email : req.body['email'][0] } 
          ]
      });
      
      if(result && result[0]){ 
          res.status(409).send({stat:false, message: '이미 처리된 요청입니다. 서버에서 중복이 발생했습니다.'}) 
          const error = new Error('서버에서 중복값 에러가 발생했습니다. 공격자일 수 있습니다.')
          logEvents(`${error}\t${req.url}\t${req.headers.origin}\t ${req.ip}`,'errLog.log')
      }
      else{ 
          const userInfo = await createUserData(req.body);
          const jwtInfo = {id: userInfo.id[0], email : userInfo.email[0], name : userInfo.name[0], aors: userInfo.aors[0]}
          try {
              const token = await createJWT(jwtInfo);
              await userRecord(userInfo.id[0])
              res.status(201).send({stat:true, message:'생성에 성공했습니다', userInfo : jwtInfo, jwt: token});
          } catch (e) {
              res.status(501).send({stat:false, message: '토큰생성 에러입니다. 마음이 아픕니다.'});
          }
      }
  }
  catch(err){ 
      res.status(409).send({stat: false, message: err+'에러일거에요'});
      logEvents(`${err}\t${req.url}\t${req.headers.origin}\t ${req.ip}`,'errLog.log')
  }
}

module.exports = {signUp};