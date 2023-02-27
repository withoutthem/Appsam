const User = require('../models/User');

const createUserData = async(userInput)=>{ //db에 저장하는 함수
    const user = await userWithEncoded(userInput);
    return user.save();
}

const userWithEncoded = ({userID, name, userPassword})=>{ //암호화
    //여기에 암호화
    const user = new User({userID, name, userPassword}); //schema에 집어넣기
    return user
}

const signUp = async (req, res, next)=>{
    try{
        const {userID} = req.body;
        //여기에 중복검사
        await createUserData(req.body);
        res.status(201).send('생성 success!')
    }
    catch(err){
        res.send(err+'에러입니다.')
        console.log('err: '+ err)
    }
}

module.exports = {signUp};