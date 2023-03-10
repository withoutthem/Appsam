
// 1 detph router
const authRoutes = require('./auth');

const router = (app)=>{
    app.use('/api/auth', authRoutes) // api/auth/ ~
}

module.exports = router;