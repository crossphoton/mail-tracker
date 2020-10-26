const express = require('express');
const mongo = require('mongoose');
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config()


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.listen(PORT, ()=>console.log("Server up at "+PORT));


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(express.static(__dirname + "/public"));



const imageRequested= require("./middlewares/imageRequest");
const createTracker= require("./middlewares/createTracker");
const viewTracker= require("./middlewares/viewTracker");
const listTrackers= require("./middlewares/listTrackers");
const getToken = require("./middlewares/githubLogin/getToken");
const getUser = require("./middlewares/githubLogin/getUser");
const saveUser = require("./middlewares/githubLogin/saveUser");
const login = require("./middlewares/githubLogin/login");




mongo.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db)=>{
    if(err) throw err;
    console.log("Database Connected")
})


app.get("/", (req, res)=>{
    if(req.signedCookies.login) return res.redirect("/dashboard");
    res.sendFile(__dirname+"/public/index.html");
})

app.get("/dashboard", (req, res)=>{
    if(!req.signedCookies.login) return res.redirect("/");
    res.sendFile(__dirname + "/public/dashboard.html");
})

app.get("/login/callback", getToken, getUser, saveUser, login);


app.post("/new/tracker", createTracker);


app.get("/tracker/:id", imageRequested, (req, res)=>{
    res.sendFile(__dirname+"/assets/free.png");
})

app.get("/view/tracker/:id", viewTracker);

app.get("/list/trackers", listTrackers);