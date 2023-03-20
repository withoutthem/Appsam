// 1 detph router
const authRoutes = require('./auth');
const trackingRoutes = require('./tracking');
const chatmainRoutes = require('./chatmain');

const router = (app) => {
    app.use('/api/auth', authRoutes); // api/auth/ ~
    app.use('/api/tracking', trackingRoutes); //api/tracking ~
    app.use('/api/chatmain', chatmainRoutes); //api/chatmain ~
};

module.exports = router;
