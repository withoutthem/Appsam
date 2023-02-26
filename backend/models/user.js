const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    name : {
        type:String,
        required: true
    },
    userPassword :{
        type:String,
        required:true
    }
},
{versionKey : false}
);

module.exports = mongoose.model('User', userSchema);