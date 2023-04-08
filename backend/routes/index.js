// 1 detph router
const authRoutes = require('./auth');
const trackingRoutes = require('./tracking');
const chatmainRoutes = require('./chatmain');
const productRoutes = require('./product');

const router = (app) => {
    app.use('/api/auth', authRoutes); // api/auth/ ~
    app.use('/api/tracking', trackingRoutes); //api/tracking ~
    app.use('/api/chatmain', chatmainRoutes); //api/chatmain ~
    app.use('/api/product', productRoutes); //api/product ~
};

module.exports = router;
