require('dotenv').config()
const db = require("../models");
const nodemailer = require("nodemailer")

const Supervisor = db.supervisor
const School = db.school
const Teacher = db.teacher
const Student = db.student

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


// Sign Up

exports.supervisorSignUp = (req, res) => {
    const user = new Supervisor({
        username : req.body.username,
        userNumber : req.body.userNumber,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8)
    })

    user.save((err) => {
        if(err) {
            res.status(500).send({ message: err })
            return;
        }
        res.send({ message: "تمت إضافة المشرف بنجاح!" });
    })
};
exports.schoolSignUp = (req, res) => {
    const user = new School({
        username : req.body.username,
        userNumber : req.body.userNumber,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
        name : {
            ar : req.body.name.ar,
            en : req.body.name.en
        },
        gender : req.body.gender,
        phoneNumber : req.body.phoneNumber,
        studentsNumber : req.body.studentsNumber,
        teachersNumber : req.body.teachersNumber,
        ministerialSymbol : req.body.ministerialSymbol,
        type : req.body.type
    })

    user.save((err) => {
        if(err) {
            res.status(500).send({ message: err })
            return;
        }
        res.send({ message: "تمت إضافة المدير بنجاح!" });
    })
};
exports.teacherSignUp = (req, res) => {
    const user = new Teacher({
        username : req.body.username,
        userNumber : req.body.userNumber,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
        levelID : req.body.levelID,
        schoolID : req.body.schoolID
    })

    user.save((err) => {
        if(err) {
            res.status(500).send({ message: err })
            return;
        }
        res.send({ message: "تمت إضافة المعلم بنجاح!" });
    })
};
exports.studentSignUp = (req, res) => {
    const user = new Student({
        username : req.body.username,
        userNumber : req.body.userNumber,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
        levelID : req.body.levelID,
        schoolID : req.body.schoolID
    })

    user.save((err) => {
        if(err) {
            res.status(500).send({ message: err })
            return;
        }
        res.send({ message: "تمت إضافة الطالب بنجاح!" });
    })
};


// Sign In

exports.supervisorSignIn = (req, res) => {
    Supervisor.findOne({
        userNumber : req.body.userNumber
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المشرف." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "كلمة المرور خاطئة!"
            });
        }

        const token = jwt.sign({ id: user.id },
            process.env.SECRET_KEY,
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });

        res.status(200).send({
                id: user._id,
                username: user.username,
                userNumber: user.userNumber,
                email: user.email,
                accessToken: token
            });
    })
}
exports.schoolSignIn = (req, res) => {
    School.findOne({
        userNumber : req.body.userNumber
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المدير." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "كلمة المرور خاطئة!"
            });
        }

        const token = jwt.sign({ id: user.id },
            process.env.SECRET_KEY,
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });

        res.status(200).send({
                id: user._id,
                username: user.username,
                userNumber: user.userNumber,
                email: user.email,
                accessToken: token
            });
    })
}
exports.teacherSignIn = (req, res) => {
    Teacher.findOne({
        userNumber : req.body.userNumber
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المعلم." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "كلمة المرور خاطئة!"
            });
        }

        const token = jwt.sign({ id: user.id },
            process.env.SECRET_KEY,
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });

        res.status(200).send({
                id: user._id,
                username: user.username,
                userNumber: user.userNumber,
                email: user.email,
                schoolID: user.schoolID,
                accessToken: token
            });
    })
}
exports.studentSignIn = (req, res) => {
    Student.findOne({
        userNumber : req.body.userNumber
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد الطالب." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "كلمة المرور خاطئة!"
            });
        }

        const token = jwt.sign({ id: user.id },
            process.env.SECRET_KEY,
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });

        res.status(200).send({
                id: user._id,
                username: user.username,
                userNumber: user.userNumber,
                email: user.email,
                teacherID: user.teacherID,
                schoolID: user.schoolID,
                accessToken: token
            });
    })
}

// Forget Password

// Send Mail (Fn)
function sendEmail(email, OTP){
    return new Promise((resolve, reject) => {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
              user: "mamo992001@gmail.com",
              pass: "nizh hnke qmqm xvdi"
            }
          });
    
          const data = {
            from : "mamo992001@gmail.com",
            to: email,
            subject: "Reset Account Password Link",
            html: `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - OTP Email Template</title>
      
        <style>

        </style>

    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">إدارة منصة عالم الأطفال</a>
        </div>
        <p style="font-size:1.1em">مرحبا,</p>
        <p>استخدم الكود في الصندوق أدناه لإكمال عملية إعادة تعيين كلمة المرور. الكود صالح لمدة 5 دقائق</p>
        <h2 style="background: #DC73A6;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
        <p style="font-size:0.9em;">مع فائق الإحترام<br /></p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>منصة عالم الأطفال</p>
        </div>
      </div>
    </div>
    <!-- partial -->
      
    </body>
    </html>`
          };
    
          mailTransporter.sendMail(data, function(error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
              }
            return resolve({ message: "تم إرسال كود تحقق الى البريد الكتروني" });
            });
    })
}

// Generate OTP code (Fn)
function generateOTP(){
    let code = "";
    for(let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10)
    }
    return code
}



// Forget Password 

exports.supervisorForgetPassword = (req, res) => {
    Supervisor.findOne(
        {email : req.body.email}
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المشرف." });
        }
        const OTP = generateOTP();

        user.resetPasswordOTP = OTP;
        user.resetPasswordExpireAt = Date.now() + 300000 // 900000 = 15m

        user.save(err => {
            if(err) {
                res.status(500).send({ error: err })
            }

            sendEmail(req.body.email, OTP)
            .then((response) => res.send(response.message))
            .catch((error) => res.status(500).send(error.message))
        })

    })
}
exports.schoolForgetPassword = (req, res) => {
    School.findOne(
        {email : req.body.email}
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المدير." });
        }
        const OTP = generateOTP();

        user.resetPasswordOTP = OTP;
        user.resetPasswordExpireAt = Date.now() + 300000 // 300000 = 5 minutes

        user.save(err => {
            if(err) {
                res.status(500).send({ error: err })
            }

            sendEmail(req.body.email, OTP)
            .then((response) => res.send(response.message))
            .catch((error) => res.status(500).send(error.message))
        })

    })
}
exports.teacherForgetPassword = (req, res) => {
    Teacher.findOne(
        {email : req.body.email}
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المعلم." });
        }
        const OTP = generateOTP();

        user.resetPasswordOTP = OTP;
        user.resetPasswordExpireAt = Date.now() + 300000 // 300000 = 5 minutes

        user.save(err => {
            if(err) {
                res.status(500).send({ error: err })
            }

            sendEmail(req.body.email, OTP)
            .then((response) => res.send(response.message))
            .catch((error) => res.status(500).send(error.message))
        })

    })
}
exports.studentForgetPassword = (req, res) => {
    Student.findOne(
        {email : req.body.email}
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد الطالب." });
        }
        const OTP = generateOTP();

        user.resetPasswordOTP = OTP;
        user.resetPasswordExpireAt = Date.now() + 300000 // 300000 = 5 minutes

        user.save(err => {
            if(err) {
                res.status(500).send({ error: err })
            }

            sendEmail(req.body.email, OTP)
            .then((response) => res.send(response.message))
            .catch((error) => res.status(500).send(error.message))
        })

    })
}

// Verify OTP

exports.supervisorVerifyOTP = (req, res) => {
    Supervisor.findOne(
        {
            email: req.body.email
        }
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المشرف." });
        }

        if(!(req.body.otpCode === user.resetPasswordOTP)) {
            return res.status(404).send({ message: "الكود خاطئ حاول مرة أخرى!." });
        }

        if(Date.now() > user.resetPasswordExpireAt.getTime()) {
            return res.status(404).send({ message: "لقد مر أكثر من 5 دثائق على الكود حاول مجددا" });
        }

        return res.status(200).send({message: "تم التحقق بنجاح"});
    })
}
exports.schoolVerifyOTP = (req, res) => {
    School.findOne(
        {
            email: req.body.email
        }
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المدير." });
        }

        if(!(req.body.otpCode === user.resetPasswordOTP)) {
            return res.status(404).send({ message: "الكود خاطئ حاول مرة أخرى!." });
        }

        if(Date.now() > user.resetPasswordExpireAt.getTime()) {
            return res.status(404).send({ message: "لقد مر أكثر من 5 دثائق على الكود حاول مجددا" });
        }

        return res.status(200).send({message: "تم التحقق بنجاح"});
    })
}
exports.teacherVerifyOTP = (req, res) => {
    Teacher.findOne(
        {
            email: req.body.email
        }
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المعلم." });
        }

        if(!(req.body.otpCode === user.resetPasswordOTP)) {
            return res.status(404).send({ message: "الكود خاطئ حاول مرة أخرى!." });
        }

        if(Date.now() > user.resetPasswordExpireAt.getTime()) {
            return res.status(404).send({ message: "لقد مر أكثر من 5 دثائق على الكود حاول مجددا" });
        }

        return res.status(200).send({message: "تم التحقق بنجاح"});
    })
}
exports.studentVerifyOTP = (req, res) => {
    Student.findOne(
        {
            email: req.body.email
        }
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد الطالب." });
        }

        if(!(req.body.otpCode === user.resetPasswordOTP)) {
            return res.status(404).send({ message: "الكود خاطئ حاول مرة أخرى!." });
        }

        if(Date.now() > user.resetPasswordExpireAt.getTime()) {
            return res.status(404).send({ message: "لقد مر أكثر من 5 دثائق على الكود حاول مجددا" });
        }

        return res.status(200).send({message: "تم التحقق بنجاح"});
    })
}


// Reset Password

exports.supervisorResetPassword = (req, res) => {
    Supervisor.findOne(
        {
            email: req.body.email
        }
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المشرف." });
        }

        user.password = bcrypt.hashSync(req.body.password, 8);

        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            return res.status(200).send({message : "تمت إعادة تعيين كلمة المرور بنجاح"})
        })
    })
}
exports.schoolResetPassword = (req, res) => {
    School.findOne(
        {
            email: req.body.email
        }
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المدير." });
        }

        user.password = bcrypt.hashSync(req.body.password, 8);

        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            return res.status(200).send({message : "تمت إعادة تعيين كلمة المرور بنجاح"})
        })
    })
}
exports.teacherResetPassword = (req, res) => {
    Teacher.findOne(
        {
            email: req.body.email
        }
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد المعلم." });
        }

        user.password = bcrypt.hashSync(req.body.password, 8);

        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            return res.status(200).send({message : "تمت إعادة تعيين كلمة المرور بنجاح"})
        })
    })
}
exports.studentResetPassword = (req, res) => {
    Student.findOne(
        {
            email: req.body.email
        }
    )
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "لم يتم إيجاد الطالب." });
        }

        user.password = bcrypt.hashSync(req.body.password, 8);

        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            return res.status(200).send({message : "تمت إعادة تعيين كلمة المرور بنجاح"})
        })
    })
}


