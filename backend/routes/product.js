
//2depth router

const express = require('express');
const router = express.Router();

const {getAllProduct, getProductList, addProduct, getGrade, getOneProduct, patchOneProduct} = require('../controllers/product')

router.get('/getallproduct', getAllProduct) // api/product/getallproduct
router.get('/getproductlist', getProductList) // /api/product/productlist
router.get('/getgrade', getGrade) // /api/product/getgrade?grade=flagship
router.get('/getoneproduct', getOneProduct) // /api/product/getoneproduct?name=product이름

// 관리자용 (admin)
router.patch('/patchoneproduct', patchOneProduct) // /api/product/patchoneproduct
router.post('/add', addProduct ) // /api/product/add

module.exports = router;