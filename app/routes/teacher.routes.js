const { authJwt } = require("../middlewares");
const controller = require("../controllers/teacher.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.get("/api/teacher/students",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.getStudents
    )

    app.put("/api/teacher/student/:studentId/rate",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.updateRate
    )
}