const {Schema, model} = require("mongoose");

const teacherSchema = new Schema({
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
        required : true
    },
    password : {
        type : String,
        required : true
    },
    levelID : {
        type : Schema.Types.ObjectId,
        ref : "level"
    },
    schoolID : {
        type : Schema.Types.ObjectId,
        ref : "school"
    },
    id_Number : Number,
    avatar : String,
    resetPasswordOTP : String,
    resetPasswordExpireAt : Date
});

const Teacher = model("teacher", teacherSchema);

module.exports = Teacher;