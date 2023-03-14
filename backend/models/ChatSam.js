const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

const chatSamSchema = new Schema({
    type:{
        type:String,
        required:true
    },
    id:{
        type:String,
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
        required: true
    },
    likes:{
        type:[String],
        required: false
    },
    time : {
        type:String,
        required: true
    }
},
{timestamps: true}, // 타임스탬프를 추가할 수 있다.
);

chatSamSchema.plugin(AutoIncrement, { //설정
	inc_field:'ticket',
    id:'ticketNums',
    start_seq:1
})

module.exports = mongoose.model('CHATSAM', chatSamSchema);