const User = require('../models/User')

// 중복 검사해주는 유틸
const getDuplicate = (req, res, next )=>{
    try{
        User.findOne(req.body)
        .then((result)=>{
            if(result){
                res.send({stat: false, message:`이미 있는 ${Object.keys(req.body)[0]} 입니다.`})
            }
            else{
                res.status(200).send({stat:true, message: '사용가능'})
            }
        })
    }
    catch(e){
        console.log(e + '예상하지 못한 에러당')
    }
}

module.exports = { getDuplicate };