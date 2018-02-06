
const mongoose = require('mongoose');
const { Schema } = mongoose;

var userSchema = new Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {
    User
}