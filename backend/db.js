const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const mongooseConnect = async ()=>{
  try{
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    }, ()=>{
      console.log('연결되었습니다 db.js');
    })
  }
  catch(err){
    console.log(err)
  }

}

module.exports = mongooseConnect;