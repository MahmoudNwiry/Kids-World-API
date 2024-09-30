const {Schema, model} = require("mongoose");

const studentSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    userNumber : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    levelID : {
        type : Schema.Types.ObjectId,
        ref : "level"
    },
    schoolID : {
        type : Schema.Types.ObjectId,
        ref : "school"
    },
    resetPasswordOTP : String,
    resetPasswordExpireAt : Date
})

const Student = model("student", studentSchema);

module.exports = Student