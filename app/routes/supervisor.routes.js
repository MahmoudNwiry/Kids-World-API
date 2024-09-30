const { authJwt } = require("../middlewares");
const controller = require("../controllers/supervisor.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/supervisor/books",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.addBook
    );

    app.delete(
        "/api/supervisor/book/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.deleteBook
    )

    app.put(
        "/api/supervisor/book/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.updateBook
    )

    app.post(
        "/api/supervisor/books/lessons",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.addLesson
    )
    app.delete(
        "/api/books/lessons/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.deleteLesson
    )
    app.put(
        "/api/books/lessons/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.updateLesson
    )
}