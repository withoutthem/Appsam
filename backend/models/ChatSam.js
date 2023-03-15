const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

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
        required: false
    }
},
{
    timestamps: true, // 타임스탬프를 추가할 수 있다.
}, 
);

chatSamSchema.index({ like: -1, createdAt: -1 }); // 복합인덱스 생성

chatSamSchema.plugin(AutoIncrement, { //설정
	inc_field:'ticket',
    id:'ticketNumsSam',
    start_seq:1
})

module.exports = mongoose.model('ChatSam', chatSamSchema);