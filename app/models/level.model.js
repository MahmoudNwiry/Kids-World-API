const {Schema, model} = require("mongoose");

const levelSchema = new Schema({
    name : String,
    number : Number
})

const Level = model("level", levelSchema)

module.exports = Level