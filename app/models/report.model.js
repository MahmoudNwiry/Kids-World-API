const {Schema, model} =  require("mongoose");

const reportSchema = new Schema({
    sender : {
        id : Schema.Types.ObjectId,
        role : String,
        name : String,
    },
    receiver : {
        id : Schema.Types.ObjectId,
        role : String,
        name : String
    },
    body : String,
    file : {
        type : String,
        default : null
    },
    time : {
        type : Date,
        default : Date.now()
    },
    report_number : Number
});

const Report = model("report", reportSchema);

module.exports = Report;