const User = require('../models/User');
const Daily = require('../models/tracking');
const bcrypt = require('bcrypt');
const { logEvents } = require('../middleware/logger');
const { createJWT } = require('../utils/jwtController');
const {userRecord} = require('../utils/userRecord');

//signIn 메인로직
const signIn = async (req, res, next) => {
  try {
    const result = await User.findOne({ id: req.body.id }); // 아이디 찾기
    if (result) { //아이디 있으면
      const same = await bcrypt.compare(req.body.ps, result.ps); // bcrypt 해시 디코딩
      if (same) { //디코딩 된 경우
        const userData = { //유저데이터 생성
          id: result.id,
          email: result.email,
          name: result.name,
          aors: result.aors,
        };
        const token = await createJWT(userData); //찾은 유저데이터 기반으로 jwt 생성
        await userRecord(result.id) // 유저 방문기록 저장
        res.status(200).send({ //토큰 보내주기
          stat: true,
          message: "로그인 성공",
          etc: "Authorized",
          jwt: token,
          userInfo: {
            id: result.id,
            email: result.email,
            name: result.name,
            aors: result.aors,
          },
        });
      } else { //디코딩 실패한 경우
        res.status(401).send({ stat: false, message: "비밀번호가 맞지 않습니다.", etc: "unAuthorized" });
      }
    } else { //아이디 없는 경우
      res.status(401).send({ stat: false, message: "아이디가 없습니다.", etc: "unAuthorized" });
    }
  } catch (e) { //알수없는 서버에러인 경우
    res.status(500).send({ stat: false, message: "서버 에러입니다." });
    logEvents(`${e}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
  }
};

module.exports = { signIn };