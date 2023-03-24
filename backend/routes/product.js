
//2depth router

const express = require('express');
const router = express.Router();

const {getProductList, addProduct, getAllProductByCompany, getProductByType} = require('../controllers/product')

router.get('/getproductlist', getProductList) // /api/product/productlist
router.post('/add', addProduct ) // /api/product/add
router.get('/getallproduct', getAllProductByCompany ) // /api/product/getallproduct?product=app
router.get('/getproducttype', getProductByType) // /api/product/getproducttype?company=app&type=pc

module.exports = router;