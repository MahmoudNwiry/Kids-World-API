const {Schema, model} = require("mongoose")

const schoolSchema = new Schema({
    name : {
        ar : {
            type : String,
            required : true,
        },
        en : {
            type : String,
            required : true,
        }
    },
    email : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
    },
    userNumber : {
        type : Number,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    studentsNumber : {
        type : Number,
        default : 0,
    },
    teachersNumber : {
        type : Number,
        default : 0
    },
    password : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    ministerialSymbol : {
        type : String,
        required : true
    },
    id_Number : Number,
    avatar : String,
    resetPasswordOTP : String,
    resetPasswordExpireAt : Date
})

const School = model("school", schoolSchema)

module.exports = School