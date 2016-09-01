/*
Here is where you make the connection to the database and export and used by the O.R.M.
*/
var mysql = require('mysql');
var connection;


/*var connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ratvm'
});*/

var keys = require('../keys.js');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'd6q8diwwdmy5c9k9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'n0kvsf4ou0obe3o4',
  password : keys.importantKeys.jawsDBpassword,
  database : 'nze8kwnmv806oiw8'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


/*connection.connect();*/
module.exports = connection;