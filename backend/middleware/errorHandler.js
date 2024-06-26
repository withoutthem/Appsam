const { logEvents } = require('./logger');

const errorHandler = (err, req, res, next)=>{
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\t ${req.ip}`, 'errLog.log');
    // console.log(err.stack+'error stack');

    const status = res.statusCode ? res.statusCode : 500 //server error

    res.status(status);
    // test
    res.json({ message : err.message })
}

module.exports = errorHandler;

