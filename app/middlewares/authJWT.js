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
        if(teacher) {
            req.role = "teacher"
            next();
        }
        if(!teacher) {
            School.findById(req.userId).exec((err, school) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if(school) {
                    req.role = "school"
                    next();
                }
                if(!school) {
                    Supervisor.findById(req.userId).exec((err, supervisor) => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }

                        if(supervisor) {                         
                            req.role = "supervisor"
                            next();
                        }
                    
                        if(!supervisor) {
                            res.status(401).send({ message: "ليس لديك صلاحية!" })
                            return
                        }
                    });
                }
            })
        }
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

const isTeacherSenderReport = (req, res, next) => {
    let sender = {}
    Teacher.findById(req.userId).exec((err, teacher) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(teacher) {
            sender.role = "teacher"
            sender.name = teacher.username
            req.sender = { ...sender }
            next();
        }
        if(!teacher) {
            School.findById(req.userId).exec((err, school) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if(school) {
                    sender.role = "school"
                    sender.name = school.username
                    req.sender = { ...sender }
                    next();
                }
                if(!school) {
                    Supervisor.findById(req.userId).exec((err, supervisor) => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }
                        if(supervisor) {
                            sender.role = "supervisor"
                            sender.name = supervisor.username
                            req.sender = { ...sender }
                            next();
                        }
                    
                        if(!supervisor) {
                            res.status(401).send({ message: "ليس لديك صلاحية!" })
                            return
                        }
                    });
                }
            })
        }
    })
}

const isTeacherReceiverReport = (req, res, next) => {
    let receiver = {}
    Teacher.findOne({_id : req.body.receiver}).exec((err, teacher) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(teacher) {
            receiver.role = "teacher"
            receiver.name = teacher.username
            req.receiver = { ...receiver }
            next();
        }
        if(!teacher) {         
            School.findOne({ _id : req.body.receiver }).exec((err, school) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if(school) {
                    receiver.role = "school"
                    receiver.name = school.username
                    req.receiver = { ...receiver }
                    next();
                }
                if(!school) {                 
                    Supervisor.findOne({_id : req.body.receiver}).exec((err, supervisor) => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }                        

                        if(supervisor) {
                            receiver.role = "supervisor"
                            receiver.name = supervisor.username
                            req.receiver = { ...receiver }
                            next();
                        }

                        if(!supervisor) {
                            res.status(401).send({ message: "لم يتم العثور على المستلم" })
                            return
                        }
                    });
                }
            })
        } 
    })
}


const authJwt = {
    verifyToken,
    isSupervisor,
    isSchool,
    isTeacher,
    isStudent,
    isTeacherSenderReport,
    isTeacherReceiverReport
};

module.exports = authJwt;