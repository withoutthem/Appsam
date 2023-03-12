
// 2depth router
const express = require('express');
const router = express.Router();

const { tracking } = require('../controllers/tracking');


router.get('/', tracking) // /api/tracking/ (트래킹)


module.exports = router;