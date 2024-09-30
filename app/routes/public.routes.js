const { authJwt } = require("../middlewares");
const controller = require("../controllers/public.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/student", [authJwt.verifyToken, authJwt.isStudent], controller.studentBoard);

  app.get(
    "/api/test/teacher",
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.teacherBoard
  );

  app.get(
    "/api/test/school",
    [authJwt.verifyToken, authJwt.isSchool],
    controller.schoolBoard
  );

  app.get(
    "/api/test/supervisor",
    [authJwt.verifyToken, authJwt.isSupervisor],
    controller.supervisorBoard
  )

  app.get("/api/levels", controller.getLevels)
  app.get("/api/books", controller.getBooks)
  app.get("/api/book/:id", controller.getBookByID)

  app.get("/api/book/:bookID/lessons", controller.getLessons)

  app.get("/api/quran", controller.getQuran)
};