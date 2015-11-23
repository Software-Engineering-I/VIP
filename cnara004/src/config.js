/**
 * Created on 10/8/2015.
 */
module.exports = {
    'port' : process.env.PORT || 8088,
    /*
     There must be a better way to authenticate with our database to push new info into it..
     This can't be secure..

     for now
     mongodb://[username]:[password]@[serveraddress]:[port]/[database path]
     */
    'database' : 'mongodb://proj-submit:submit@127.0.0.1:27017/projects'
};