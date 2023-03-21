const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specSchema = new Schema({
  released :{
    type:{String},
    required:true
  },
  ap:{
    type:{String},
    required:true
  },
  memory:{
    type:{String},
    required:true
  },
  display:{
    type:{String},
    required:true
  },
  camera:{
    type:{String},
    required:true
  },
  battery:{
    type:{String},
    required:true
  },
  color:{
    type:{String},
    required:true
  },
  weight:{
    type:{String},
    required:true
  },
  bioAuth:{
    type:{String},
    required:true
  },
  etc:{
    type:{String},
    required:false,
    default:[]
  },
  price:{
    type:{String},
    required:true
  },
  pros:{
    type:{String},
    required:true
  },
  cons:{
    type:{String},
    required:true
  },
  summary:{
    type:{String},
    required:true,
    default:'딱히 없음'
  }
},{ _id: false })

const productSchema = new Schema({
    companyType:{
        type:String, // 'app' or 'sam'
        required:true
    },
    productType:{
        type:String, // 'pc', 'mo', 'tablet', 'watch', 'laptop', 'earbuds'
        required: true
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
      required: true
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


// badge 이름

// 가성비급: value_for_money
// 엔트리급: entry_level
// 중상급: mid_high_level
// 플래그쉽: flagship
// 가장최신: latest_release
// 명작: masterpiece
// 가성비: cost_effectiveness




module.exports = mongoose.model('Product', productSchema);