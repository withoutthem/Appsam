
//2depth router

const express = require('express');
const router = express.Router();

const { addProduct, getAllProductByCompany } = require('../controllers/product')

router.post('/add', addProduct ) // /api/product/add
router.get('/getallproduct', getAllProductByCompany ) // /api/product/getallproduct?product=app

module.exports = router;