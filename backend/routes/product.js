
//2depth router

const express = require('express');
const router = express.Router();

const {getAllProduct, getProductList, addProduct, getGrade, getOneProduct} = require('../controllers/product')

router.get('/getallproduct', getAllProduct) // api/product/getallproduct
router.get('/getproductlist', getProductList) // /api/product/productlist
router.post('/add', addProduct ) // /api/product/add
router.get('/getgrade', getGrade) // /api/product/getgrade?grade=flagship
router.get('/getoneproduct', getOneProduct) // /api/product/getoneproduct?name=product이름

module.exports = router;