const db = require("../models");

const Teacher = db.teacher;
const Student = db.student;

exports.getStudents = (req, res) => {
    Teacher.findById(req.userId).exec((err, teacher) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(!teacher) {
            res.status(400).send({message : "لم يتم العثور على المعلم"})
            return;
        }

        Student.find({
            schoolID : teacher.schoolID,
            levelID : teacher.levelID
        }, "-password -__v -avatar")
        .exec((err, students) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            return res.status(200).send(students)
        })
    })
}

exports.updateRate = (req, res) => {
    const studentId = req.params.studentId;
    Student.findByIdAndUpdate(
        studentId,
        {
            rate : req.body.rate
        }
    )
    .exec((err, student) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(!student) {
            res.status(400).send({message : "لم يتم العثور على الطالب"})
            return
        }

        return res.send({message : "تم تعديل التقييم للطالب"})
    })
}

