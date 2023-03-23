const Product = require('../models/Product');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const addProduct = async (req, res) => {
  const {
    companyType,
    productType,
    productName,
    productImg,
    badge,
    spec,
    like,
    likes
  } = req.body.productInfo;
  try{
    const nowProduct = new Product({
      companyType,
      productType,
      productName,
      productImg,
      badge,
      spec,
      like,
      likes
    })
    await nowProduct.save()
    res.send({stat:true, message:'성공해써요'})
  }
  catch(e){
    res.status(500).send({stat:false, message:'저장 안됬습니다', error : e})
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// /api/product/getallproduct?company=app
const getAllProductByCompany = async (req, res, next) => {
  try {
    const nowCompanyType = req.query.company;
    if (nowCompanyType === 'app' || nowCompanyType === 'sam') {
      const result = await Product.find({ companyType: nowCompanyType });
      res.send({ stat: true, data: result });
    } else {
      throw new Error('app이나 sam 요청이 아닙니다.');
    }
  } catch (e) {
    res.status(400).send({ stat: false, message: e.message });
  }
};








module.exports = {addProduct, getAllProductByCompany};