const db = require("../models");
const Book = db.book

exports.addBook = (req, res) => {
    const book = new Book({
        name : req.body.name,
        image : req.body.image,
        levelID : req.body.levelID
    })

    book.save((err) => {
        if(err) {
            res.status(500).send({message : err});
            return
        }

        res.send({ message: "تمت إضافة الكتاب بنجاح!" })
    })
}