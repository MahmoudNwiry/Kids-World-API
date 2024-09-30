const db = require("../models");
const Level = db.level

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