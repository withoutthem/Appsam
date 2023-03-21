
//2depth router

const express = require('express');
const router = express.Router();

const { addProduct } = require('../controllers/product')

router.post('/add', addProduct ) // /api/product/add

module.exports = router;