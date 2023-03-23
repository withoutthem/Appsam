const Product = require('../models/Product');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST요청, 제품추가 : /api/product/add 
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

// app or sam 전체 제품 불러오기 GET요청 : /api/product/getallproduct?company=app
const getAllProductByCompany = async (req, res, next) => {
  try {
    const nowCompanyType = req.query.company;

    if(nowCompanyType !== 'app' && nowCompanyType !== 'sam'){
      throw new Error('app이나 sam 요청이 아닙니다.')
    }

    const result = await Product.find({ companyType: nowCompanyType });
    res.send({ stat: true, data: result });

  } catch (e) {
    res.status(400).send({ stat: false, message: e.message });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app or sam, type별로 전체 제품 불러오기 GET요청 : /api/product/getproducttype?company=app&type=pc
const getProductByType = async (req, res, next) =>{
  try {
    const { company, type } = req.query;

    if (company !== 'app' && company !== 'sam') { // if 리턴을 통한 err 예외처리 방식 패턴
      throw new Error('올바른 요청이 아닙니다. company가 맞지 않습니다.');
    }

    if (!['pc', 'mo', 'tablet', 'watch', 'laptop', 'earbuds'].includes(type)) {
      throw new Error('올바른 요청이 아닙니다. 제품 type이 맞지 않습니다.');
    }

    const result = await Product.find({ companyType: company, productType: type });

    res.send({ stat: true, data: result });
  } catch (e) {
    res.status(400).send({ stat: false, message: e.message });
  }
};




module.exports = {addProduct, getAllProductByCompany, getProductByType};