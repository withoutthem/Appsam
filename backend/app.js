const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path');

// body-parser setting 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//environment variables setting
require('dotenv').config(); 
const ENV = process.env;

// cors setting 
const cors = require('cors'); 
let corsOption = {
    origin: `http://localhost:${ENV.PORT}`, // 허용 주소
    credentials: true  // true시 설정 내용을 응답헤더에 추가해 줌
}
app.use(cors(corsOption)); // CORS 미들웨어 추가

app.use(express.static(path.join(__dirname, 'public'))) // static path 미들웨어 

router(app);

module.exports = app;