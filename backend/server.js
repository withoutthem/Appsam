const app = require('./app');
const http = require('http');
const mongooseConnect = require('./db');
const mongoose = require('mongoose');
const { logEvents, logger } = require('./middleware/logger')
const server = http.createServer(app);

mongooseConnect(); //db 연결 호출

mongoose.connection.once('open', ()=>{ //mongoose eventListener
    server.listen(process.env.PORT, ()=>{
        console.log('server.js에서'+process.env.PORT)
    })
})

mongoose.connection.on('error', err => { //mongoose Error log
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
})