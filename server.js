var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')



//Passport Authentication
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');

var app = express();

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


//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'sql5.freemysqlhosting.net',
  user     : 'sql5129693',
  password : 'kzGxKjkBrI',
  database : 'sql5129693'
});

*/

 

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'ratvm'
});





connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };

  console.log('connected as id ' + connection.threadId);

});

app.get('/', function(req,res) {
    connection.query('SELECT * FROM plans;', function(err, data) {
      if (err) throw err;

      res.render('index', {plans: data});

    });
});


app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){});
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    console.log("ta da!");
    res.redirect('/');
  });





app.post('/create', function(req,res){
    connection.query('INSERT INTO plans (plan) VALUES (?)', [req.body.plan], function(err, result) {
      if (err) throw err;
      res.redirect('/');
    });
});

//========================================PAYMENT JS======================================//

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys


// PUT THIS CODE INTO SERVER !!!!!!!!!!!!!!!!!!!!


// !!!!!!!!!!!!!!!! the below code has an error
var stripe = require("stripe")("sk_test_0KQEJUx0c4wjut7VcRNluN4F");



connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };

  console.log('connected as id ' + connection.threadId);

});

app.get('/', function(req,res) {
    connection.query('SELECT * FROM plans;', function(err, data) {
      if (err) throw err;

      res.render('index', {plans: data});

    });
});

app.post('/create', function(req,res){
    connection.query('INSERT INTO plans (plan) VALUES (?)', [req.body.plan], function(err, result) {
      if (err) throw err;
      res.redirect('/');
    });
});

app.post('/charge', function(req,res){

  // (Assuming you're using express - expressjs.com)
  // Get the credit card details submitted by the form
  var stripeToken = req.body.stripeToken;

  stripe.customers.create({
    source: stripeToken,
    description: 'RATVM Balance'
  }).then(function(customer) {
    return stripe.charges.create({
      amount: 500, // amount in cents, again
      currency: "usd",
      customer: customer.id
    });
  }).then(function(charge) {
    res.redirect('/');
  });

});

//========================================PAYMENT JS======================================//


/*app.delete('/delete', function(req,res){
    connection.query('DELETE FROM plans WHERE id = ?', [req.body.id], function(err, result) {
      if (err) throw err;
      res.redirect('/');
    });
});*/

app.put('/update', function(req,res){

    connection.query('UPDATE plans SET vote = ? WHERE id = ?', [req.body.plan, req.body.id], function(err, result) {
      if (err) throw err;
      res.redirect('/');
    });
});


// TO DO --- replace 4 and 10 with ? or something like that
// and fix main.js so that the .ajax gives us the right things to update

app.put('/update2/:pp/:ss', function(req,res){

    var updateId = req.params.pp;
    var updateNumber = req.params.ss;
    //console.log(updateId);
    //console.log(updateNumber);

    connection.query('UPDATE plans SET vote = '+ updateNumber +' WHERE id = ' + updateId +'', [req.body.plan, req.body.id], function(err, result) {
        if (err) throw err;
      res.send('good job');
    });
});




var PORT = process.env.PORT || 3000;
app.listen(PORT);



