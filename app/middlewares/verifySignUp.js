const db = require("../models");

const Supervisor = db.supervisor;
const School = db.school;
const Teacher = db.teacher;
const Student = db.student;

checkSupervisorDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Supervisor.findOne({
    username: req.body.username
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "فشل: اسم المستخدم موجود بالفعل!" });
      return;
    }

    // Email
    Supervisor.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "فشل: البريد الاكتروني موجود بالفعل!" });
        return;
      }

      next();
    });
  });
};


checkSchoolDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    School.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "فشل: اسم المستخدم موجود بالفعل!" });
        return;
      }
  
      // Email
      School.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (user) {
          res.status(400).send({ message: "فشل: البريد الاكتروني موجود بالفعل!" });
          return;
        }
  
        next();
      });
    });
};

checkTeacherDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    Teacher.findOne({
      username: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "فشل: اسم المستخدم موجود بالفعل!" });
        return;
      }
  
      // Email
      Teacher.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (user) {
          res.status(400).send({ message: "فشل: البريد الاكتروني موجود بالفعل!" });
          return;
        }
  
        next();
      });
    });
};
  
  
checkStudentDuplicateUsernameOrEmail = (req, res, next) => {
      // Username
      Student.findOne({
        username: req.body.username
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        if (user) {
          res.status(400).send({ message: "فشل: اسم المستخدم موجود بالفعل!" });
          return;
        }
    
        // Email
        Student.findOne({
          email: req.body.email
        }).exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (user) {
            res.status(400).send({ message: "فشل: البريد الاكتروني موجود بالفعل!" });
            return;
          }
    
          next();
        });
      });
};


const verifySignUp = {
    checkSupervisorDuplicateUsernameOrEmail,
    checkSchoolDuplicateUsernameOrEmail,
    checkTeacherDuplicateUsernameOrEmail,
    checkStudentDuplicateUsernameOrEmail
}

module.exports = verifySignUp