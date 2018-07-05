const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require("./routes/users");

const app = express();
//r8lIKVlr4alixwFb
mongoose.connect(
    "mongodb+srv://abhijeetblog:r8lIKVlr4alixwFb@cluster0-rr3zb.mongodb.net/test?retryWrites=true"
).then(() => {
    console.log("Connection Successful");
}).catch(() => {
    console.log("Connection Failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//for all incoming requests
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, OPTONS");
    next();
})

app.use("/api/users", userRoutes);

module.exports = app;