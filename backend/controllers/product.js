const Product = require('../models/Product');
const ProductList = require('../models/ProductList');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET요청, 모든제품리스트데이터 가져오기 : /api/product/getproductlist 
const getProductList = async (req, res, next) =>{
  try{
    const result = await ProductList.find().select('-_id -list._id') //제공된 데이터의 _id제외, 그리고 list안의 _id도 제외

    result.forEach(productList => {
      productList.list.sort((a, b) => b.released - a.released); //최신이 위로 올라옴(내림차순)
    });
    res.send({stat:true, message:'모든 리스트 데이터를 가져왔어요', data:result})
  }
  catch(e){
    res.status(500).send({stat:false, message:'서버 에러입니다. 허접한 개발자를 탓하십시오.'})
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST요청, 제품추가 : /api/product/add 
const addProduct = async (req, res, next) => {
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

  // productList에 추가해야함
  const nowListItem = {
    companyType : req.body.productInfo.companyType,
    productType : req.body.productInfo.productType,
    product : {
      name : req.body.productInfo.productName,
      released : req.body.productInfo.spec.released.value
    }
  }

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

    let productList = await ProductList.findOne({
      companyType: nowListItem.companyType,
      productType: nowListItem.productType
    });
    
    if(productList){ // 리스트가 있으면
      productList.list.push(nowListItem.product)      
    }
    else{ //리스트가 없으면 생성
      productList = new ProductList({
        companyType : nowListItem.companyType,
        productType : nowListItem.productType,
        list : [nowListItem.product]
      })
    }

    await productList.save();

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




module.exports = {getProductList, addProduct, getAllProductByCompany, getProductByType};