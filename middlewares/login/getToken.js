const fetch = require('node-fetch')


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

async function main(req, res, next){
    const { code } = req.query;


    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
    fetch(`https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}&accept=json`, requestOptions)
    .then(response => response.text())
    .then(result => {
        token = result.split("&")[0].split("=")[1];
        req.token = token;
        next();
    })
    .catch(error => console.log('error', error));
}


module.exports = main;