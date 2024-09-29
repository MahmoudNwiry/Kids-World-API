const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
        "/api/auth/supervisor/signup",
        verifySignUp.checkSupervisorDuplicateUsernameOrEmail,
        controller.supervisorSignUp
    );
    app.post(
        "/api/auth/school/signup",
        verifySignUp.checkSchoolDuplicateUsernameOrEmail,
        controller.schoolSignUp
    );
    app.post(
        "/api/auth/teacher/signup",
        verifySignUp.checkTeacherDuplicateUsernameOrEmail,
        controller.teacherSignUp
    );
    app.post(
        "/api/auth/student/signup",
        verifySignUp.checkStudentDuplicateUsernameOrEmail,
        controller.studentSignUp
    );
  
    app.post("/api/auth/supervisor/signin", controller.supervisorSignIn);
    app.post("/api/auth/school/signin", controller.schoolSignIn);
    app.post("/api/auth/teacher/signin", controller.teacherSignIn);
    app.post("/api/auth/student/signin", controller.studentSignIn);

    app.post("/api/auth/supervisor/forget-password", controller.supervisorForgetPassword)
    app.post("/api/auth/school/forget-password", controller.schoolForgetPassword)
    app.post("/api/auth/teacher/forget-password", controller.teacherForgetPassword)
    app.post("/api/auth/student/forget-password", controller.studentForgetPassword)

    app.post("/api/auth/supervisor/verifyOTP", controller.supervisorVerifyOTP)
    app.post("/api/auth/school/verifyOTP", controller.schoolVerifyOTP)
    app.post("/api/auth/teacher/verifyOTP", controller.teacherVerifyOTP)
    app.post("/api/auth/student/verifyOTP", controller.studentVerifyOTP)

    app.post("/api/auth/supervisor/reset-password", controller.supervisorResetPassword)
    app.post("/api/auth/school/reset-password", controller.schoolResetPassword)
    app.post("/api/auth/teacher/reset-password", controller.teacherResetPassword)
    app.post("/api/auth/student/reset-password", controller.studentResetPassword)
  };