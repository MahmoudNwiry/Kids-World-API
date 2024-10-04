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

    app.post("/api/supervisor/books",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.addBook
    );

    app.delete("/api/supervisor/book/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.deleteBook
    )

    app.put("/api/supervisor/book/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.updateBook
    )

    app.post("/api/supervisor/books/lessons",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.addLesson
    )
    app.delete("/api/supervisor/books/lessons/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.deleteLesson
    )
    app.put("/api/supervisor/books/lessons/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.updateLesson
    )

    app.post("/api/supervisor/quran",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.addQuran
    )
    app.delete("/api/supervisor/quran/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.deleteQuran
    )
    app.put("/api/supervisor/quran/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.updateQuran
    )


    app.post("/api/supervisor/stories",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.addStory
    )
    app.delete("/api/supervisor/story/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.deleteStory
    )
    app.put("/api/supervisor/story/:id",
        [authJwt.verifyToken, authJwt.isSupervisor],    
        controller.updateStory
    )

    app.get("/api/supervisor/reports",
        [authJwt.verifyToken, authJwt.isSupervisor],
        controller.getAllReports
    )
}