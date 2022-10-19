const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id:String,
    name:String,
    email:{
        type:String,
        required:true,
        minlength:10,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    referral:{
        type:String,
        required:false,
    },
    phonenumber:{
        type:Number,
        required:false,
    },
    country:{
        type:String,
        required:false,

    }
})

module.exports = mongoose.model("User" , userSchema);