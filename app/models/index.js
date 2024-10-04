const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;


db.supervisor = require("./supervisor.model");
db.school = require("./school.model");
db.teacher = require("./teacher.model");
db.student = require("./student.model");
db.level = require("./level.model");
db.book = require("./book.model");
db.lesson = require("./lesson.model");
db.quran = require("./quran.model");
db.story = require("./story.model");
db.report = require("./report.model")


module.exports = db;