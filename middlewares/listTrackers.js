const User = require("../models/user");
const getUsername = require("./getUsername");


function main(req, res, next){
    User.findOne({username: getUsername(req.signedCookies)}, {_id: 0, mails: 1}, (err, data)=>{
        if(err){
            console.error(err);
            return res.sendStatus(500);
        }
        if(data == null) return res.redirect("/", 404);

        res.json(data.mails);
    })
}

module.exports = main