const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//ticket 카운터 구현
const counterSchemaSam = new Schema({
  _id: String,
  seq: Number
});
const CounterSam = mongoose.model('CounterSam', counterSchemaSam);


const chatSamSchema = new Schema({
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
        default:[]
    },
    ticket:{
      type:Number,
      unique : true
    }
},
{
    timestamps: true, // 타임스탬프를 추가할 수 있다.
}, 
);



chatSamSchema.pre('save', async function (next) {
  try {
    const counterSam = await CounterSam.findByIdAndUpdate(
      'ticketNumsSam',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.ticket = counterSam.seq;
    next();
  } catch (error) {
    console.error('Error in chatSamSchema pre save middleware:', error);
    next(error);
  }
});



module.exports = mongoose.model('ChatSam', chatSamSchema);