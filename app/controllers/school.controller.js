const db = require("../models");

const Teacher = db.teacher;
const Student = db.student;

exports.getStudentsAndTeachers = async (req, res) => {
    try {
        const students = await Student.find({schoolID : req.userId}, "-__v -password -avatar");
        const teachers = await Teacher.find({schoolID : req.userId}, "-__v -password -avatar");

        res.status(200).send({students, teachers})

    } catch (err) {
        res.status(500).send({message : err});
        return
    }
}

exports.getTeachers = (req, res) => {
    Teacher.find({schoolID : req.userId})
    .exec((err, students) => {
        if(err) {
            if(err) {
                res.status(500).send({message : err});
                return
            }

            res.status(200).send(students)
        }
    })
}


exports.updateStudent = async (req, res) => {

    if(req.body?.password) {
        res.status(400).send({message : "لا يمكن تعديل كلمة المرور  "})
        return
    }

    if(req.body?.userNumber) {
        res.status(400).send({message : "لا يمكن تعديل رقم الطالب"})
        return
    }

    const studentId = req.params.studentId
    if(req.role === "supervisor") {
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
    else {
        Student.findById(studentId)
        .exec((err, student)=> {
            if(err) {
                res.status(500).send({message : err})
                return
            }

            if(!student) {
                res.status(404).send({message : "لم يتم العثور على الطالب"})
                return
            }
            
            if(student.schoolID.toString() !== req.userId) {
                res.status(401).send({message : "غير مصرح لك التعديل على بيانات الطالب"})
                return
            }
            
            student.update({...req.body}).exec((err) => {
                if(err) {
                    res.status(500).send({message : err})
                    return
                }
                return res.status(200).send({message : "تم تعديل بيانات الطالب"})
            });
        })
    }
}

exports.deleteStudent = (req, res) => {
    const studentId = req.params.studentId
    if(req.role === "supervisor") {
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
    else {
        Student.findById(studentId)
        .exec((err, student)=> {
            if(err) {
                res.status(500).send({message : err})
                return
            }

            if(!student) {
                res.status(404).send({message : "لم يتم العثور على الطالب"})
                return
            }
            
            if(student.schoolID.toString() !== req.userId) {
                res.status(401).send({message : "غير مصرح لك حذف الطالب"})
                return
            }
            
            Student.deleteOne({_id : student._id}).exec((err) => {
                if(err) {
                    res.status(500).send({message : err})
                    return
                }
                return res.status(200).send({message : "تم حذف الطالب"})
            });
        })
    }
}


exports.updateTeacher = async (req, res) => {

    if(req.body?.password) {
        res.status(400).send({message : "لا يمكن تعديل كلمة المرور  "})
        return
    }

    if(req.body?.userNumber) {
        res.status(400).send({message : "لا يمكن تعديل رقم المعلم"})
        return
    }

    const teacherId = req.params.teacherId
    if(req.role === "supervisor") {
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
    else {
        Teacher.findById(teacherId)
        .exec((err, teacher)=> {
            if(err) {
                res.status(500).send({message : err})
                return
            }

            if(!teacher) {
                res.status(404).send({message : "لم يتم العثور على المعلم"})
                return
            }
            
            if(teacher.schoolID.toString() !== req.userId) {
                res.status(401).send({message : "غير مصرح لك التعديل على بيانات المعلم"})
                return
            }
            
            teacher.update({...req.body}).exec((err) => {
                if(err) {
                    res.status(500).send({message : err})
                    return
                }
                return res.status(200).send({message : "تم تعديل بيانات المعلم"})
            });
        })
    }
}


exports.deleteTeacher = (req, res) => {
    const teacherId = req.params.teacherId
    if(req.role === "supervisor") {
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
    else {
        Teacher.findById(teacherId)
        .exec((err, teacher)=> {
            if(err) {
                res.status(500).send({message : err})
                return
            }

            if(!teacher) {
                res.status(404).send({message : "لم يتم العثور على المعلم"})
                return
            }
            
            if(teacher.schoolID.toString() !== req.userId) {
                res.status(401).send({message : "غير مصرح لك حذف المعلم"})
                return
            }

            Teacher.deleteOne({_id : teacher._id}).exec((err) => {
                if(err) {
                    res.status(500).send({message : err})
                    return
                }
                return res.status(200).send({message : "تم حذف المعلم"})
            });
        })
    }
}
