const app = require('./app');
const mongoose = require('mongoose');
const mongooseConnect = require('./db');
const { logEvents } = require('./middleware/logger');

const port = process.env.PORT || 3000;

const startServer = () => {
  app.listen(port, () => {
    console.log(`서버가 ${port}에서 실행 중`);
  });
};

const connectAndStart = async ()=>{
  try{
    await mongooseConnect();
    startServer();
  }
  catch(error){
    console.log('MongoDB 연결 실패:', error);
    logEvents(`${error.name}: ${error.message}`, 'mongoErrLog.log');
  }
}

connectAndStart();