/*
Here is where you setup a model for how to interface with the database.
*/

var orm = require('../config/orm.js');

var users = {

   //login variable

     
  //code for handling users goes here
  /*
  selectAll: function (cb) {
    orm.selectAll('ratvm', function (res) {
      cb(res);
    });
  },
  // cols and vals are arrays
  insertOne: function (cols, vals, cb) {
    orm.insertOne('ratvm', cols, vals, function (res) {
      cb(res);
    });
  },
  updateOne: function (objColVals, condition, cb) {
    orm.updateOne('ratvm', objColVals, condition, function (res) {
      cb(res);
    });
    */
  
};

module.exports = users;
