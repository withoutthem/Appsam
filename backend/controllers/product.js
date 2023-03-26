const Product = require('../models/Product');
const ProductList = require('../models/ProductList');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET요청, 모든제품리스트데이터만 가져오기 : /api/product/getproductlist 
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

const getAllProduct = async (req, res) =>{
  try{
    const allProduct = await Product.find()
    if(allProduct){
      res.send({stat:true, message: '모든 제품 데이터를 싸그리 다 가져왔습니다', data : allProduct});
    }
    else{
      throw new Error('데이터가 왜 없죠?')
    }
  }
  catch(e){
    res.status(500).send({stat:false, message: e.message})
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getGrade = async (req, res) => {
  try {
    const {grade} = req.query;
    if (!grade) {
      throw { status: 404, message: 'grade를 확인해야합니다. 잘못된 요청입니다. 그런 제품이 없습니다.' };
    }

    const products = await Product.find({ badge: { $in: [grade] } }); //badge 배열 중에 grade 가 포함된 녀석을 가져온다.

    if (products.length === 0) {
      throw { status: 500, message: '서버에 데이터가 없습니다. 뭐지? 개발자를 탓하세요' };
    }
    res.send({ stat: true, message: `성공적으로 ${req.query.grade} 데이터를 가져왔습니다`, data: products });
  } catch (e) {
    res.status(e.status || 500).send({ stat: false, message: e.message });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getOneProduct = async (req, res) =>{
  try{
    const { name } = req.query
    if(!name){
      throw {status:400, message : '제품 이름이 없습니다. 이름을 통해 요청하세요.'};
    }

    const product = await Product.findOne({productName : name});
    if(!product || product.length === 0){
      throw {status:404, message : '그런 제품이 없습니다. 제가 찾아봤습니다.'}
    }

    res.send({stat:true, message:`${name} 에 대한 데이터를 전송합니다.`, data : product})
  }
  catch(e){
    res.status(e.status || 500).send({stat:false, message:e.message})
  }
}


module.exports = {getAllProduct, getProductList, addProduct, getGrade, getOneProduct};