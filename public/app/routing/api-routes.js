// ===============================================================================
// LOAD DATA

// ===============================================================================

var friendData = require('../data/friends.js');
var path      = require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

  // API GET Requests
  // Below code handles when users "visit" a page. 
  // In each of the below cases when a user visits a link 
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table) 
  // ---------------------------------------------------------------------------

  app.get('/api/survey', function(req, res){
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate Javascript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------

  app.post('/api/survey', function(req, res){

    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table 
  /*  if(friendData.length < 5 ){
      friendData.push(req.body);
      res.json(true); // KEY LINE
    }
    
    // Or false if they don't have a table
    else{
      waitListData.push(req.body);
      res.json(false); // KEY LINE
    }
*/

    //console.log(req.body);
    friendData.push(req.body);
 

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don't worry about it!

  app.post('/api/clear', function(req, res){
    // Empty out the arrays of data
    friendData = [];
    console.log(friendData);
  })
}