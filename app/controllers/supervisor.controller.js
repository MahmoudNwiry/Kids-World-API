const db = require("../models");
const Book = db.book;
const Lesson = db.lesson;
const Quran = db.quran;

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

exports.addLesson = (req, res) => {
    const lesson = new Lesson({
        name : req.body.name,
        number : req.body.number,
        numberAsString : req.body.numberAsString,
        url : req.body.url,
        audio : req.body.audio,
        bookID : req.body.bookID
    });

    lesson.save((err) => {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        res.status(200).send({ message: "تمت إضافة الدرس بنجاح!" })
    })
}
exports.deleteLesson = (req, res) => {
    let lessonID = req.params.id;
    Lesson.findByIdAndDelete(lessonID)
          .exec((err, lesson) => {
            if(err) {
                res.status(500).send({message : err})
                return
            }
            if(!lesson) {
                res.status(500).send({message : "لم يتم العثور على الدرس"})
                return
            }

            return res.status(200).send({message : "تم حذف الدرس"})
          })
}
exports.updateLesson = (req, res) => {
    let lessonID = req.params.id;
    Lesson.findByIdAndUpdate(
        lessonID,
        {
            name : req.body.name,
            number : req.body.number,
            numberAsString : req.body.numberAsString,
            url : req.body.url,
            audio : req.body.audio,
            bookID : req.body.bookID
        }
    )
    .exec((err, lesson) => {
        if(err) {
            res.status(500).send({message : err});
            return
        }
        if(!lesson) {
            res.status(404).send({message : "لم يتم العثور على الدرس"});
            return
        }
        res.send({ message: "تم تعديل الدرس بنجاح!" })
    })
}


exports.addQuran = (req, res) => {
    const quran = new Quran({
        name : req.body.name,
        order : req.body.order,
        ayatNumber : req.body.atatNumber,
        type : req.body.type,
        url : req.body.url
    })

    quran.save((err) => {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        return res.status(200).send({message : "تم إضافة بيانات السورة بنجاح"})
    })
}
exports.deleteQuran = (req, res) => {
    let id = req.params.id;
    Quran.findByIdAndDelete(id)
    .exec((err, quran) => {
        if(err) {
            res.status(500).send({message : err})
            return
        }
        if(!quran) {
            res.status(500).send({message : "لم يتم العثور على شيء"})
            return
        }

        return res.status(200).send({message : "تم الحذف"})
      })
}
exports.updateQuran = (req, res) => {
    let id = req.params.id;
    Quran.findByIdAndUpdate(
            id,
            {
                name : req.body.name,
                order : req.body.order,
                ayatNumber : req.body.atatNumber,
                type : req.body.type,
                url : req.body.url 
            }
    )
    .exec((err) => {
        if(err) {
            res.status(500).send({message : err});
            return
        }

        return res.send({message : "تم التعديل على بيانات السورة"})
    })
}