const express = require('express');
const app = express();
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
    origin: `http://localhost:${ENV.PORT}`, // 허용 주소(8080)
    credentials: true  // true시 설정 내용을 응답헤더에 추가해 줌
}
app.use(cors(corsOption)); // CORS 미들웨어 추가

app.use(express.static(path.join(__dirname, './public'))) // static path 미들웨어 

app.get('/api/test', (req, res)=>{
    res.send('get요청 성공!')
})

//main Page
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(ENV.PORT, (req,res)=>{
    console.log('u r listening to ' + ENV.PORT)
})

// 404는 react가 router 담당
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})