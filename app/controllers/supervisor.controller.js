const db = require("../models");

const School = db.school
const Teacher = db.teacher
const Student = db.student
const Book = db.book;
const Lesson = db.lesson;
const Quran = db.quran;
const Story = db.story;
const Report = db.report


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


exports.addStory = (req, res) => {
    const story = new Story({
        name: req.body.name,
        image : req.body.image,
        type : req.body.type,
        url : req.body.url
    })

    story.save((err) => {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        return res.status(200).send({message : "تم إضافةالقصة بنجاح"})
    })
}
exports.deleteStory = (req, res) => {
    let id = req.params.id;
    Story.findByIdAndDelete(id)
    .exec((err, story) => {
        if(err) {
            res.status(500).send({message : err})
            return
        }
        if(!story) {
            res.status(500).send({message : "لم يتم العثور على القصة"})
            return
        }

        return res.status(200).send({message : "تم الحذف"})
      })
}
exports.updateStory = (req, res) => {
    let id = req.params.id;
    Story.findByIdAndUpdate(
            id,
            {
                name : req.body.name,
                image : req.body.image,
                type : req.body.type,
                url : req.body.url 
            }
    )
    .exec((err) => {
        if(err) {
            res.status(500).send({message : err});
            return
        }

        return res.send({message : "تم التعديل على بيانات القصة"})
    })
}



exports.getAllReports = (req, res) => {
    Report.find()
    .exec((err, reports) => {
        if(err) {
            res.status(500).send({message : err})
            return 
        }

        res.status(200).send(reports)
    })
}

exports.getAllUsers = async (req, res) => {
    try {
        const students = await Student.find()
        const teachers = await Teacher.find()
        const schools = await School.find()

        res.status(200).send({students, teachers, schools})

    } catch (error) {
        res.status(500).send({message : err})
        return
    }
}

exports.updateStudent = (req, res) => {
    if(req.body?.password) {
        res.status(400).send({message : "لا يمكن تعديل كلمة المرور  "})
        return
    }

    if(req.body?.userNumber) {
        res.status(400).send({message : "لا يمكن تعديل رقم الطالب"})
        return
    }

    const studentId = req.params.studentId

    Student.findByIdAndUpdate(
        studentId,
        {
            username : req.body.username,
            userNumber : req.body.userNumber,
            email : req.body.email,
            levelID : req.body.levelID,
            schoolID : req.body.schoolID,
            rate : req.body.rate,
            id_Number : req.body.id_Number,
            avatar: req.body.avatar
        }
    ).exec((err, student)=> {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        if(!student) {
            res.status(404).send({message : "لم يتم العثور على الطالب"})
            return
        }

        res.status(200).send({message : "تم تعديل بيانات الطالب"})
    })
}
exports.deleteStudent = (req, res) => {
    const studentId = req.params.studentId
    Student.findByIdAndDelete(studentId).exec((err, student)=> {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        if(!student) {
            res.status(404).send({message : "لم يتم العثور على الطالب"})
            return
        }

        res.status(200).send({message : "تم حذف الطالب"})
    })
}

exports.updateTeacher = (req, res) => {
    if(req.body?.password) {
        res.status(400).send({message : "لا يمكن تعديل كلمة المرور  "})
        return
    }

    if(req.body?.userNumber) {
        res.status(400).send({message : "لا يمكن تعديل رقم المعلم"})
        return
    }

    const teacherId = req.params.teacherId;
    Teacher.findByIdAndUpdate(
        teacherId,
        {
            username : req.body.username,
            email : req.body.email,
            levelID : req.body.levelID,
            schoolID : req.body.schoolID,
            id_Number : req.body.id_Number,
            avatar: req.body.avatar
        }
    ).exec((err, teacher)=> {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        if(!teacher) {
            res.status(404).send({message : "لم يتم العثور على المعلم"})
            return
        }

        res.status(200).send({message : "تم تعديل بيانات المعلم"})
    })
}
exports.deleteTeacher = (req, res) => {
    const teacherId = req.params.teacherId
    Teacher.findByIdAndDelete(teacherId).exec((err, teacher)=> {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        if(!teacher) {
            res.status(404).send({message : "لم يتم العثور على المعلم"})
            return
        }

        res.status(200).send({message : "تم حذف المعلم"})
    })
}

exports.updateSchool = (req, res) => {
    if(req.body?.password) {
        res.status(400).send({message : "لا يمكن تعديل كلمة المرور  "})
        return
    }

    if(req.body?.userNumber) {
        res.status(400).send({message : "لا يمكن تعديل رقم المدير"})
        return
    }

    const schoolId = req.params.schoolId;
    School.findByIdAndUpdate(
        schoolId,
        {
            username : req.body.username,
            email : req.body.email,
            name : {
                ar : req.body.name?.ar,
                en : req.body.name?.en
            },
            gender : req.body.gender,
            phoneNumber : req.body.phoneNumber,
            studentsNumber : req.body.studentsNumber,
            teachersNumber : req.body.teachersNumber,
            ministerialSymbol : req.body.ministerialSymbol,
            type : req.body.type,
            id_Number : req.body.id_Number,
            avatar: req.body.avatar
        }
    ).exec((err, school)=> {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        if(!school) {
            res.status(404).send({message : "لم يتم العثور على المدير"})
            return
        }

        res.status(200).send({message : "تم تعديل بيانات المدير"})
    })
}

exports.deleteSchool = (req, res) => {
    const schoolId = req.params.schoolId;
    School.findById(schoolId).exec(async (err, school) => {
        if(err) {
            res.status(500).send({message : err})
            return
        }

        if(!school) {
            res.status(404).send({message : "لم يتم العثور على المدرسة"})
            return
        }
        try {
            await Student.deleteMany({schoolID : schoolId})
            await Teacher.deleteMany({schoolID: schoolId})
            School.findByIdAndDelete(schoolId).exec(err => {
                if(err) {
                    res.status(500).send({message : err})
                    return
                }
                res.status(200).send({message : "تم حذف المدرسة وجميع بياناتها"})
            })
        }
        catch (err) {
            res.status(500).send({message : err})
            return
        }
    })
}