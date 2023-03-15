
// 1 detph router
const authRoutes = require('./auth');
const trackingRoutes = require('./tracking');
const chatMainRoutes = require('./chatmain');

const router = (app)=>{
    app.use('/api/auth', authRoutes) // api/auth/ ~
    app.use('/api/tracking', trackingRoutes) //api/tracking ~
    app.use('/api/chatmain', chatMainRoutes) //api/chatmain ~
}

module.exports = router;