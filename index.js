const express = require('express');
const mongo = require('mongoose');
const fetch = require('node-fetch');
const app = express();
const db = ""


const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mail-tracker";

app.listen(PORT, ()=>console.log("Server up at "+PORT));


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));



const imageRequested= require("./middlewares/imageRequest");
const getToken = require("./middlewares/login/getToken");
const getUser = require("./middlewares/login/getUser");
const saveUser = require("./middlewares/login/saveUser");




mongo.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db)=>{
    if(err) throw err;
    console.log("Database Connected")
})





app.get("/mail/:id", imageRequested, (req, res)=>{
    const { url } = req;
    console.log(url);
    res.sendFile(__dirname+"/assets/main.png");
})

app.get("/login/callback", getToken, getUser, saveUser);