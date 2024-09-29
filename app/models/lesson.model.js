const {Schema, model} = require("mongoose");

const lessonSchema = new Schema({
    name : String,
    number : Number,
    numberAsString : String,
    url : String,
    audio : String,
    bookID : {
        type : Schema.Types.ObjectId,
        ref : "book"
    }
})

const Lesson = model("lesson", lessonSchema);

module.exports = Lesson