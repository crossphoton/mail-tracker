const jwt = require("jsonwebtoken");

function main(cookie){
    const  {token} = cookie;
    if(!token) return null;
    const {username} = jwt.decode(token, process.env.JWT_SECRET)
    return username;
}


module.exports = main;