const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

mongoose.set('strictQuery', true);

const app =  express();

var corsOptions = {
    origin : "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));


(async function(){
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log(`Error: ${error}`);
    }

})();

app.get("/", (req, res) => {
    res.send("<h1>Hello from server</h1>")
});

require('./app/routes/auth.routes')(app);
require('./app/routes/public.routes')(app);


app.listen(5000, ()=>console.log("listening to port 5000: http://localhost:5000"));