const Daily = require('../models/tracking');
  
const userRecord = async (nowID) => { // HTTP 응답 이후 추가작업(비동기)
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  const getDailyDB = await Daily.findOne({ //오늘날짜 찾기
    date: `${year}-${month < 10 ? "0" + month:month}-${day < 10 ? "0" + day:day}`,
  });

  if (getDailyDB) { //오늘날짜 DB가 이미 있으면
    const isDuplicates = await Daily.findOne({
      "data.users": nowID,
    });
    if (isDuplicates) { //이미 아이디 있으면
      console.log("토큰이 있으나 이미 오늘활동이 기록되었습니다.");
    } else { //아이디가 없는 경우
      await getDailyDB.data.users.push(nowID);
      await getDailyDB.save(); //저장
      console.log("오늘날짜가 있는데 저장 완료.");
    }
  } else { //오늘날짜 DB가 없는 경우
    const daily = new Daily({ // daily 스키마 생성
      date: `${year}-${month < 10 ? "0" + month:month}-${day < 10 ? "0" + day:day}`,
      data: {
        users: nowID
      },
    });
    await daily.save(); //저장
    console.log("새로운 저장완료");
  }
};

module.exports = { userRecord };