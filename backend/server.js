const app = require('./app');
const http = require('http');
const mongoose = require('./db');

const server = http.createServer(app);

const nowServer = async ()=>{
    try{
        await mongoose;
        server.listen(process.env.PORT, ()=>{
            console.log('server.js에서'+process.env.PORT)
        })
    }
    catch(e){
        console.log('DB에러다 뿡'+e)
    }
}

nowServer();