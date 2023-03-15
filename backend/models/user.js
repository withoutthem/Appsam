const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    profile_img:{
        type: String,
        required: false,
        default:'none'
    },
    ps :{
        type:String,
        required:true
    },
    email : {
        type:String,
        required: true
    },
    name : {
        type:String,
        required: true
    },
    aors : {
        type: String,
        required : true
    }
},
{versionKey : false}
);

module.exports = mongoose.model('User', userSchema);