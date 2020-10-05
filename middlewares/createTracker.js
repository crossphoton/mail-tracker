const Mail = require("../models/mail");
const user = require("../models/user");
const User = require("../models/user");
const getUsername = require("./getUsername");

async function main(req, res, next){

    const username = getUsername(req.signedCookies);

    const tracker = new Mail({
        user: username,
        data: [],
        description: req.body.description || ""
    });

    try {
        User.findOne({username}, {mails: 1}, (err, data)=>{
            if(err) return console.log(err);
            if(data == null) return res.redirect("/logout");
            const mail = {
                _id: tracker._id,
                iat: tracker.iat,
                description: tracker.description
            }
            data.mails.push(mail);
            try {
                data.save();
            } catch (error) {
                console.log(error)
            }
            tracker.save();
            res.json({id: tracker._id});
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

module.exports = main;