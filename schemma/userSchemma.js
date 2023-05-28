const mongoose = require('mongoose');

const validator = require('validator');
const userSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unqiue : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter a valid Email ID.')
            }
        }
    },
    password : {
        type : String,
        required : true,
        unique : true
    }
})
const User = new mongoose.model('User',userSchema);
module.exports = {User,userSchema};