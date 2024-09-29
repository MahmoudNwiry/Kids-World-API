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
    supervisorID : {
        type : Schema.Types.ObjectId,
        ref : "supervisor"
    },
    resetPasswordOTP : String,
    resetPasswordExpireAt : Date
})

const School = model("school", schoolSchema)

module.exports = School