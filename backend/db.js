const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

//db 연결모듈 싱글톤패턴
const mongooseConnect = async ()=>{
  try{
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    })
  }
  catch(err){
    console.log(err)
  }

}

module.exports = mongooseConnect;