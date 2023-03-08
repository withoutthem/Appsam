const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/auth');
const { getDuplicate } = require('../utils/getDuplicate')

router.post('/signup', signUp) // /api/auth/signup
router.post('/dupchk', getDuplicate) // /api/auth/dupchk

module.exports = router;