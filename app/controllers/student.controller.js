const db = require("../models");

const Book = db.book;
const Level = db.level;

exports.getELearning = (req, res) => {
    Level.findById(req.headers.level).exec((err, level) => {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        if(!level) {
            res.status(404).send({message : 'لم يتم العثور على المستوى'})
            return
        }

        Book.find({
            levelID : req.headers.level
        })
        .exec((err, books) => {
            if(err) {
                res.status(500).send({message : err})
                return
            }

            return res.status(200).send({level, books})
        })
    })
}