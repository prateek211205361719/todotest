
const mongoose = require('mongoose');

const  { Schema } = mongoose;

var todoSchema = new Schema({
    text:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo
}