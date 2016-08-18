// ===============================================================================
// DEPENDENCIES
// ===============================================================================
var path = require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

  // HTML GET Requests
//=============================================
// Basic route that sends the user first to the Home Page
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/../public/home.html'));
})
// sends user to survey HTML
app.get('/survey', function(req, res){
  res.sendFile(path.join(__dirname, '/../public/survey.html'));
})

  // If no matching route is found default to home
  app.use(function(req, res){
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });

}