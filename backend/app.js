const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

//environment variables setting
require('dotenv').config(); 
const ENV = process.env;

app.use(logger);

// cors setting 
const cors = require('cors'); 
let corsOption = {
    origin: (origin, callback) =>{
        if(`http://localhost:3500`.indexOf(origin) !== -1 || !origin){ //허용 주소
            callback(null, true)
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,  // true시 설정 내용을 응답헤더에 추가해 줌
    optionSuccessStatus : 200
}
app.use(cors(corsOption)); // CORS 미들웨어 추가

// body-parser setting (4.16버전 이상 express에 내장되었다.)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//cookie-parser
app.use(cookieParser());

// static path 
app.use(express.static(path.join(__dirname, 'public'))) 

app.use(errorHandler)

router(app);

module.exports = app;