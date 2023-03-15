
//2depth router

const express = require('express');
const router = express.Router();

const { popular, recent, chatPost, chatUpdate } = require('../controllers/chatMain')

// type is 'app' or 'sam' , count starts from 0
router.get('/:type/popular/:count', popular ) // /api/chatmain/:type/popular:count 
router.get('/:type/recent/:count', recent) //api/chatmain/:type/recent/:count
router.post('/:type/post', chatPost) //api/chatmain/:type/post
router.put('/:type/update/:ticket', chatUpdate ) //api/chatmain/:type/update/:ticket


module.exports = router;