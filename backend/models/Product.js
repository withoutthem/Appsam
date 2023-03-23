const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specValueSchema = new Schema({
  value:{
    type: String,
    required:true
  },
  eval: {
    type : String,
    required: false,
    default : '평가가 없습니다.'
  }
},{_id:false});

const specSchema = new Schema({
  released :specValueSchema,
  ap:specValueSchema,
  memory:specValueSchema,
  display:specValueSchema,
  camera:specValueSchema,
  battery:specValueSchema,
  color:specValueSchema,
  weight:specValueSchema,
  bioAuth:specValueSchema,
  etc:specValueSchema,
  price:specValueSchema,
  pros:specValueSchema,
  cons:specValueSchema,
  summary:specValueSchema
},{ _id: false })

const productSchema = new Schema({
    companyType:{
        type:String, // 'app' or 'sam'
        required:true,
        index:true
    },
    productType:{
        type:String, // 'pc', 'mo', 'tablet', 'watch', 'laptop', 'earbuds'
        required: true,
        index:true
    },
    productName:{
      type:String,
      required: true
    },
    productImg:{ // img uri
        type:String,
        required: true 
    },
    badge:{
      type: Array,
      required: true,
      index: true
    },
    spec:{
      type:specSchema,
      required:true
    },
    like:{
        type:Number,
        required: true,
        default:0
    },
    likes:{
        type:[String],
        required: false,
        default:[]
    }
}
);

//복합 인덱스
productSchema.index({ companyType: 1, productType: 1 });
productSchema.index({ companyType: 1, badge: 1 });

// badge 이름

// 가성비급: value_for_money
// 엔트리급: entry_level
// 중상급: mid_high_level
// 플래그쉽: flagship
// 가장최신: latest_release
// 명작: masterpiece
// 가성비: cost_effectiveness




module.exports = mongoose.model('Product', productSchema);