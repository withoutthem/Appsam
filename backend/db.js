const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
mongoose.set('strictQuery', false);
module.exports = mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
}, ()=>{
  console.log('연결되었습니다 db.js');
});