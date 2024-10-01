const {Schema, model} = require("mongoose");

const storySchema = new Schema({
    name : String,
    image : String,
    url : String,
    type : {
        type : String
    }
})

const Story = model("story", storySchema)

module.exports = Story