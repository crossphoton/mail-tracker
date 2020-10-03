const express = require('express');
const mongo = require('mongoose');
const app = express();
require("dotenv").config()


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.listen(PORT, ()=>console.log("Server up at "+PORT));


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));



const imageRequested= require("./middlewares/imageRequest");
const getToken = require("./middlewares/login/getToken");
const getUser = require("./middlewares/login/getUser");
const saveUser = require("./middlewares/login/saveUser");
const login = require("./middlewares/login/login");




mongo.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db)=>{
    if(err) throw err;
    console.log("Database Connected")
})





app.get("/mail/:id", imageRequested, (req, res)=>{
    const { url } = req;
    console.log(url);
    res.sendFile(__dirname+"/assets/main.png");
})

app.get("/login/callback", getToken, getUser, saveUser, login);