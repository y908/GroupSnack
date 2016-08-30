/*
Here is where you make the connection to the RATVM database and export and used by the O.R.M.
*/
var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {

  /*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sql5.freemysqlhosting.net',
  user     : 'sql5129693',
  password : 'kzGxKjkBrI',
  database : 'sql5129693'
});

*/
  connection = mysql.createConnection({
    port: 3306,
    host     : 'localhost',
    user     : 'root',
    password : 'b00mst1ck',
    database : 'ratvm'
    });
  };
};

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
