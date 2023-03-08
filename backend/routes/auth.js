const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/auth');
const { getDuplicate } = require('../utils/getDuplicate');
const { signIn } = require('../controllers/signin');

router.post('/signup', signUp) // /api/auth/signup
router.post('/dupchk', getDuplicate) // /api/auth/dupchk (회원가입 시 중복확인 버튼 두개)
router.post('/signin', signIn) // /api/auth/signin

module.exports = router;