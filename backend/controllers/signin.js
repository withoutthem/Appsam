const User = require('../models/User');
const Daily = require('../models/tracking');
const bcrypt = require('bcrypt');
const { logEvents } = require('../middleware/logger');
const { createJWT } = require('../utils/jwtController');
const {userRecord} = require('../utils/userRecord');

//signIn 메인로직
const signIn = async (req, res, next) => {
  try {
    const result = await User.findOne({ id: req.body.id });

    if (!result) {
      throw new Error("아이디가 없습니다.");
    }

    const same = await bcrypt.compare(req.body.ps, result.ps);

    if (!same) {
      throw new Error("비밀번호가 맞지 않습니다.");
    }

    const userData = {
      id: result.id,
      email: result.email,
      name: result.name,
      aors: result.aors,
    };

    const token = await createJWT(userData);
    await userRecord(result.id);
    res.status(200).send({
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
  } catch (e) {
    const statusCode = e.message === "아이디가 없습니다." || e.message === "비밀번호가 맞지 않습니다." ? 401 : 500;
    const etc = statusCode === 401 ? "unAuthorized" : undefined;
    res.status(statusCode).send({ stat: false, message: e.message, etc });
    logEvents(`${e}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, "errLog.log");
  }
};

module.exports = { signIn };