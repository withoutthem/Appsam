
//2depth router

const express = require('express');
const router = express.Router();

const { popular, recent, chatPost, chatUpdate, chatDelete, chatLike } = require('../controllers/chatMain')

// type is 'app' or 'sam' , count starts from 0
router.get('/:type/popular/:count', popular ) // /api/chatmain/:type/popular:count 
router.get('/:type/recent/', recent) //api/chatmain/:type/recent/?start=5&count=10
router.post('/:type/post', chatPost) //api/chatmain/:type/post
router.put('/:type/update/:ticket', chatUpdate ) //api/chatmain/:type/update/:ticket
router.delete('/:type/delete/:ticket', chatDelete ) //api/chatmain/:type/delete/:ticket
router.patch('/:type/like/:ticket', chatLike) //api/chatmain/:type/like/:ticket

module.exports = router;