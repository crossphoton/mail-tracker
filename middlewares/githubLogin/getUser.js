const fetch = require("node-fetch");


function getUser(req, res, next){

    access_token = req.token;

    fetch(`https://api.github.com/user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Accept": "application/vnd.github.v3+json"
        }
    }).then(res => res.json())
    .then(data => {
        req.user = {};
        req.user.data = data;
        next();
    });
}


module.exports = getUser;