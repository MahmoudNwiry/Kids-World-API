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

exports.deleteBook = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndDelete(id).exec((err, book) => {
        if(err) {
            res.status(500).send({message : err});
            return
        }
        if(!book) {
            res.status(404).send({message : "لم يتم العثور على الكتاب"});
            return
        }
        res.send({ message: "تم حذف الكتاب بنجاح!" })
    })
}

exports.updateBook = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndUpdate(
        id,
        {
            name : req.body.name,
            image : req.body.image,
            levelID : req.body.levelID
        }
    )
    .exec((err, book) => {
        if(err) {
            res.status(500).send({message : err});
            return
        }
        if(!book) {
            res.status(404).send({message : "لم يتم العثور على الكتاب"});
            return
        }
        res.send({ message: "تم تعديل الكتاب بنجاح!" })
    })
}