const mongo = require('mongoose');

const user = new mongo.Schema({
    username: {
        required: true,
        unique: true,
        type: String
    },
    github_data: Object,
    mails: [String],
    access_token: {
        required: true,
        unique: true,
        type: String
    }
})

module.exports = mongo.model("User", user);