const {Schema, model} = require("mongoose");

const supervisorSchema = new Schema({
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
    password : {
        type : String,
        required : true
    },
    resetPasswordOTP : String,
    resetPasswordExpireAt : Date
})

const Supervisor = model("supervisor", supervisorSchema);

module.exports = Supervisor
