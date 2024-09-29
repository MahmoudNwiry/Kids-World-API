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