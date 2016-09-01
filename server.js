
// =================REQUIRE ==================
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();



// ==========================================================
// gitHub authentication code

//Passport Authentication
var passport = require('passport');

var util = require('util');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');

app.use(passport.initialize());
app.use(passport.session());

var GITHUB_CLIENT_ID = "2e871d66505d26de2723";
var GITHUB_CLIENT_SECRET = "0507cd2eba9b6c22c9b75341e47410c326d3b931";


//serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


//
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    return done(null, profile);
  });
}));









// end of gitHub authentication code
// ==========================================================





var PORT = process.env.PORT || 3000;
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

app.listen(PORT, function(){
  console.log('App listening on PORT ' + PORT);
})

