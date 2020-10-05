const mongo = require('mongoose');

const mail = new mongo.Schema({
    user: {
        required: true,
        type: String
    },
    iat: Date,
    description: String,
    data: [{ip: String, time: {type: Date, default: new Date(Date.now())}}]
})

module.exports = mongo.model("Mails", mail);