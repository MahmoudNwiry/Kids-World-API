const {Schema, model} = require("mongoose")

const bookSchema = new Schema({
    name : String,
    image : String,
    levelID : {
        type : Schema.Types.ObjectId,
        ref : "level"
    }
})

const Book = model("book", bookSchema)

module.exports = Book