const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//ticket 카운터 구현
const counterSchema = new Schema({
  _id: String,
  seq: Number
});
const Counter = mongoose.model('Counter', counterSchema);


const chatAppSchema = new Schema({
    type:{
        type:String, //'chatApp' or 'chatSam'
        required:true
    },
    id:{
        type:String, // id
        required: true
    },
    profile_img:{
        type:String,
        required: false
    },
    aors:{
        type:String,
        required: true
    },
    text :{
        type:String,
        required: true
    },
    like:{
        type:Number,
        required: true,
        index: -1
    },
    likes:{
        type:[String],
        required: false,
        default: []
    },
    ticket:{
      type : Number,
      unique : true
    }
},
{
    timestamps: true, // 타임스탬프를 추가할 수 있다.
}, 
);


chatAppSchema.pre('save', async function (next) {
  if (this.isNew) { // 새로운 문서 저장인 경우에만 실행
    try {
      const counter = await Counter.findByIdAndUpdate(
        'ticketNumsApp',
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.ticket = counter.seq;
      next();
    } catch (error) {
      console.error('Error in chatAppSchema pre save middleware:', error);
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('ChatApp', chatAppSchema);