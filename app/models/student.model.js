const {Schema, model} = require("mongoose");

const studentSchema = new Schema({
    username : {
        type : String,
        required : true,
    },
    userNumber : {
        type : Number
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
    supervisorID : {
        type : Schema.Types.ObjectId,
        ref : "supervisor"
    },
    resetPasswordOTP : String,
    resetPasswordExpireAt : Date
})

const Student = model("student", studentSchema);

module.exports = Student