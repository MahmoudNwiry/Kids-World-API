const {Schema, model} = require("mongoose");

const notificationSchema = new Schema({
    from : Schema.Types.ObjectId,
    to : { 
        type : Schema.Types.Mixed,
        enum: [[Schema.Types.ObjectId], 'all', "school", "teacher"],
        default: 'all'
    },
    body : String,
    createdAt : {
        type : Date,
        default : Date.now()
    },
    readedBy : {
        type : [Schema.Types.ObjectId],
        default : []
    }
})

const Notification = model("notification", notificationSchema)

module.exports = Notification

