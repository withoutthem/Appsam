
//2depth router

const express = require('express');
const router = express.Router();

const { addProduct, getAllProductByCompany, getProductByType } = require('../controllers/product')

router.post('/add', addProduct ) // /api/product/add
router.get('/getallproduct', getAllProductByCompany ) // /api/product/getallproduct?product=app
router.get('/getproducttype', getProductByType) // /api/product/getproducttype?company=app&type=pc

module.exports = router;