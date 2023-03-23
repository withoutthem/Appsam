const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
  name : String,
  released : {
    type:String,
    index:true
  }
})

const productList = new Schema({
  companyType : {
    type:String,
    required:true,
  },
  productType :{
    type:String,
    required: true,
  },
  list : {
    type:[product],
    required: true,
    default:[]
  }
})

module.exports = mongoose.model('ProductList', productList);

