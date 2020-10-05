const Mail = require("../models/mail")

function main(req, res, next){
    const { id } = req.params;
    Mail.findOne({_id: id}, {_id:1, data: 1}, (err, data)=>{
        if(err) console.log(err);
        if(data == null) return res.sendStatus(404);

        const request = {
            ip: req.ip
        }
        data.data.push(request);
        try {
            data.save();
        } catch (error) {
            console.log(error);
        }
    })
    next();
}

module.exports = main;