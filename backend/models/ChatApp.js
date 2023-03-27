const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

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
    }
},
{
    timestamps: true, // 타임스탬프를 추가할 수 있다.
}, 
);

// chatAppSchema.plugin(AutoIncrement, { //설정
// 	inc_field:'ticket',
//     id:'ticketNumsApp',
//     start_seq:1
// })

module.exports = mongoose.model('ChatApp', chatAppSchema);