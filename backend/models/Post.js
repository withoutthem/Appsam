const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //object id from a schema
        required: true,
        ref: 'User' // 만든 User 스키마를 레퍼런싱한다
    },
    title : {
        type:String,
        required: true
    },
    text :{
        type:String,
        required:true
    },
    completed :{
        type:Boolean,
        required:false
    }
},
{timestamps: true}, // 타임스탬프를 추가할 수 있다.
);

postSchema.plugin(AutoIncrement, { //설정
	inc_field:'ticket',
    id:'ticketNums',
    start_seq:500
})

module.exports = mongoose.model('POST', postSchema);