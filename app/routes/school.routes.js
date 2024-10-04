const { authJwt } = require("../middlewares");
const controller = require("../controllers/school.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get("/api/school/students", 
        [authJwt.verifyToken, authJwt.isSchool],
        controller.getStudentsAndTeachers
    )
    app.put("/api/school/student/:studentId",
        [authJwt.verifyToken, authJwt.isSchool],
        controller.updateStudent
    )
    app.delete("/api/school/student/:studentId",
        [authJwt.verifyToken, authJwt.isSchool],
        controller.deleteStudent
    )
}
