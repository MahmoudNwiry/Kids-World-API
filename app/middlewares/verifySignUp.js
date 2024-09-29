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


checkSupervisorDuplicateNumber = (req, res, next) => {
  Supervisor.findOne({
    userNumber : req.body.userNumber
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if(user) {
      res.status(400).send({ message: "فشل: رقم المشرف موجود بالفعل!" });
      return;
    }

    next();
  })
}
checkSchoolDuplicateNumber = (req, res, next) => {
  School.findOne({
    userNumber : req.body.userNumber
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if(user) {
      res.status(400).send({ message: "فشل: رقم المدير موجود بالفعل!" });
      return;
    }

    next();
  })
}
checkTeacherDuplicateNumber = (req, res, next) => {
  Teacher.findOne({
    userNumber : req.body.userNumber
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if(user) {
      res.status(400).send({ message: "فشل: رقم المعلم موجود بالفعل!" });
      return;
    }

    next();
  })
}
checkStudentDuplicateNumber = (req, res, next) => {
  Student.findOne({
    userNumber : req.body.userNumber
  })
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if(user) {
      res.status(400).send({ message: "فشل: رقم الطالب موجود بالفعل!" });
      return;
    }

    next();
  })
}

const verifySignUp = {
    checkSupervisorDuplicateUsernameOrEmail,
    checkSchoolDuplicateUsernameOrEmail,
    checkTeacherDuplicateUsernameOrEmail,
    checkStudentDuplicateUsernameOrEmail,
    checkSupervisorDuplicateNumber,
    checkSchoolDuplicateNumber,
    checkTeacherDuplicateNumber,
    checkStudentDuplicateNumber
}

module.exports = verifySignUp