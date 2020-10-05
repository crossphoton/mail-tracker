const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function main(req, res, next){
    const jwt_token = jwt.sign({username: req.user.data.login}, JWT_SECRET);
    res.cookie("token", jwt_token, {maxAge: 2592000000, signed: true});
    res.cookie("login", "1", {maxAge: 2592000000, signed: true});
    res.redirect("http://localhost:3000");
}


module.exports = main;