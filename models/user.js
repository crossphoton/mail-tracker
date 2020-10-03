const mongo = require('mongoose');

const user = new mongo.Schema({
    username: String,
    github_data: Object,
    mails: [String]
})

module.exports = mongo.model("User", user);