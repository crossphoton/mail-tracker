const Mail = require("../models/mail");
const getUsername = require("./getUsername");

function main(req, res, next){
    const { id } = req.params;
    Mail.findOne({_id: id}, {_id: 0, __v: 0}, (err, data)=>{
        if(err){
            console.log(err)
            return res.sendStatus(500);
        }
        if(data == null) return res.sendStatus(404);

        if(data.user != getUsername(req.signedCookies))
            return res.sendStatus(401);
        
        res.json(data);
    });
}

module.exports = main;