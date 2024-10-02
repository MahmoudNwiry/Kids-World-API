require('dotenv').config()
const jwt = require("jsonwebtoken");
const db = require("../models");

const Supervisor = db.supervisor;
const School = db.school;
const Teacher = db.teacher;
const Student = db.student;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token,
              process.env.SECRET_KEY,
              (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Unauthorized!",
                  });
                }
                req.userId = decoded.id;
                next();
              });
};

const isSupervisor = (req, res, next) => {
    Supervisor.findById(req.userId)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if(!user) {
            res.status(401).send({ message: "ليس لديك صلاحية!" })
            return
        }
        req.role = "supervisor"
        next();
    });
};

const isSchool = (req, res, next) => {
    School.findById(req.userId).exec((err, school) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(!school) {
            Supervisor.findById(req.userId).exec((err, supervisor) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
            
                if(!supervisor) {
                    res.status(401).send({ message: "ليس لديك صلاحية!" })
                    return
                }
                req.role = "supervisor"
                next();
            });
        }
        req.role = "school"
        next();
    })
}

const isTeacher = (req, res, next) => {
    Teacher.findById(req.userId).exec((err, teacher) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(!teacher) {
            School.findById(req.userId).exec((err, school) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if(!school) {
                    Supervisor.findById(req.userId).exec((err, supervisor) => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }
                    
                        if(!supervisor) {
                            res.status(401).send({ message: "ليس لديك صلاحية!" })
                            return
                        }
                        req.role = "supervisor"
                        next();
                    });
                }
                req.role = "school"
                next();
            })
        }
        req.role = "teacher"
        next();

    })
}

const isStudent = (req, res, next) => {
    Student.findById(req.userId).exec((err, student) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(!student) {
            Teacher.findById(req.userId).exec((err, teacher) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if(!teacher) {
                    School.findById(req.userId).exec((err, school) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        if(!school) {
                            Supervisor.findById(req.userId).exec((err, supervisor) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }
                              
                                if(!supervisor) {
                                    res.status(401).send({ message: "ليس لديك صلاحية!" })
                                    return
                                }
                                req.role = "supervisor"
                                next();
                            });
                        }
                        req.role = "school"
                        next();
                    })
                }
                req.role = "teacher"
                next();
            })
        }
        req.role = "student"
        next();
    })
}

const authJwt = {
    verifyToken,
    isSupervisor,
    isSchool,
    isTeacher,
    isStudent
};

module.exports = authJwt;