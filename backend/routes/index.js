
// 1 detph router
const authRoutes = require('./auth');
const trackingRoutes = require('./tracking');

const router = (app)=>{
    app.use('/api/auth', authRoutes) // api/auth/ ~
    app.use('/api/tracking', trackingRoutes) //api/tracking ~
}

module.exports = router;