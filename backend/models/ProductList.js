const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productListSchema = new Schema({
  companyType:{
    type:String,
    required: true
  },
  productType:{
    type:String,
    required:true
  },
  productList : {
    type: Array,
    required: true,
    default:[]
  }
})


module.exports = mongoose.model('ProductList', productListSchema);