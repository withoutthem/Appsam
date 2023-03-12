
// 2depth router
const express = require('express');
const router = express.Router();

const { firstSession } = require('../controllers/tracking');


router.get('/firstsession', firstSession) // /api/tracking/firstSession (트래킹)


module.exports = router;