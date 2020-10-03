const fetch = require("node-fetch");


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "7d8e34cb2b676d7f40bc";
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "104dfcd1391a42417d6b7e6d0f191228346c2f57";

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