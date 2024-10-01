const {Schema, model} = require("mongoose");

const quranSchema = new Schema({
    order : Number,
    name : String,
    ayatNumber : Number,
    type : {type : String},
    url : String
})

const Quran = model("quran", quranSchema);

module.exports = Quran