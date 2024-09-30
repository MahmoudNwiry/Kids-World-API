const db = require("../models");
const Lesson = require("../models/lesson.model");
const Level = db.level
const Book = db.book
const Quran = db.quran

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.studentBoard = (req, res) => {
    res.status(200).send("Student Content.");
};
  
exports.teacherBoard = (req, res) => {
    res.status(200).send("Teacher Content.");
};
  
exports.schoolBoard = (req, res) => {
    res.status(200).send("School Content.");
};
exports.supervisorBoard = (req, res) => {
    res.status(200).send("Supervisor Content.");
};

exports.getLevels = (req, res) => {
    Level.find().exec((err, levels) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!levels) {
            return res.status(400).send({ message: "لا يوجد مستويات" });
        }

        res.status(200).send(levels)
    })
}

exports.getBooks = (req, res) => {
    let levelId = req.query.levelID;
    if(levelId){  
        Book.find({
            levelID : levelId
        })
        .exec((err, books) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
    
            res.status(200).send(books)
            return;
        })
    }
    else {
        Book.find()
            .exec((err, books) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!books) {
                    return res.status(400).send({ message: "لا يوجد كتب" });
                }
        
                res.status(200).send(books);
                return
        })
    }

}

exports.getBookByID = (req, res) => {
    let id = req.params.id
    Book.findById(id)
    .exec((err, book) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!book) {
            return res.status(400).send({ message: "لم يتم العثور على الكتاب" });
        }

        res.status(200).send(book)
    })
}

exports.getLessons = (req, res) => {
    let bookID = req.params.bookID;
    Lesson.find({bookID : bookID}, "-__v")
          .exec((err, lessons) => {
            if(err) {
                res.status(500).send({message : err})
                return
            }
            return res.send(lessons);
        })
}

exports.getQuran = (req, res) => {
    Quran.find()
    .exec((err, quran) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send(quran);
        return
    })
}
