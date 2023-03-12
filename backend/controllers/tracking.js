const {checkJWT} = require('../utils/jwtController')

// 개발중
const firstSession_ = async (req, res, next) => {
    try{
        //jwt 검사한다. 
        if(req.headers.cookie && req.headers.cookie.length > 0){ //jwt가 있는 경우 검사
            const nowJWT = req.headers.cookie.substring(4); // 쿠키에서 토큰 파싱
            const isValidToken = await checkJWT(nowJWT) // 쿠키 검증
            
        } 
        else{ //jwt 없는 경우
            
        }
        
        //없을 경우 ip 저장
        //있을 경우 jwt에 맞는 id를 찾아서 저장한다.
    }
    catch(e){

    }
}

// /api/auth/jwt 로 get요청 시 토큰 validation
const jwtValidator = (req, res)=>{
    if(req.headers.cookie && req.headers.cookie.length > 0){ //jwt가 있는 경우 검사
        const nowJWT = req.headers.cookie.substring(4); // 쿠키에서 토큰 파싱
        checkJWT(nowJWT) // 쿠키 검증
        .then(result=>{
            const jwtInfo = {id: result.id, email : result.email, name : result.name, aors: result.aors} // 토큰정보 가공
            res.send({stat:true, isValidJWT : true, message: '토큰 검증 성공입니다.', result :jwtInfo}) //검증 성공
        })
        .catch(error =>{
            logEvents(`${error}유효하지 않은 토큰 접근\t${req.url}\t${req.headers.origin}\t ${req.ip}`,'errLog.log')
            res.status(401).send({stat: false, message: '유효하지 않은 토큰입니다.', etc: error}); // unAuthorized
        })
    }
    else{ //jwt 없는 경우
        res.send({stat: false, message: '토큰이 없습니다. 로그인을 해주세요.', etc:'No token'}) 
    }
}


const firstSession = async (req, res, next) =>{

    console.log(req.ip)
    // const today = new Date().setHours(0, 0, 0, 0); // 오늘 날짜 0시 0분 0초

    // const todayData = await DailyDataModel.findOne({ date: today }).exec();

    // if (todayData) { // 오늘 데이터가 있을 경우, 사용자 추가
    // if(todayData.data.users.find('사용자 아이디')){}
    // todayData.data.users.push('사용자 아이디');
    // todayData.save();
    // } else {
    // // 오늘 데이터가 없을 경우, 새로운 데이터 생성
    // const newDailyData = new DailyDataModel({
    //     date: today,
    //     data: { users: ['사용자 아이디'] }
    // });
    // newDailyData.save();
    // }
}

module.exports = {firstSession};