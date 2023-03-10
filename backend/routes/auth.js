const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/auth');
const { getDuplicate } = require('../utils/getDuplicate');
const { signIn } = require('../controllers/signin');
const { jwtValidator } = require('../utils/jwtValidator');


router.post('/signup', signUp) // /api/auth/signup (회원가입)
router.post('/dupchk', getDuplicate) // /api/auth/dupchk (회원가입 시 중복확인 버튼 두개)
router.post('/signin', signIn) // /api/auth/signin (로그인)
router.get('/jwt', jwtValidator) // /api/auth/jwt (jwt 검증)


module.exports = router;