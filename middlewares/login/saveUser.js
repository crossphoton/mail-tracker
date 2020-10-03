const User = require("../../models/user");


function main(req, res, next){
    res.send("Work in Progress");
    const username = req.user.data.login;
    User.findOne({username}, {_id: 1, username: 1}, (err, data)=>{
        if(err) console.log(err)
        if(data != null) return;
        
        console.log("New User "+username);

        var user = new User({
            username,
            github_data: req.user.data,
            access_token: req.token,
            mails: []
        })

        try {
            user.save();
        } catch (error) {
            console.log(error)
        }


    })

    next();
}


module.exports = main;