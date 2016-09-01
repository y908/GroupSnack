/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//Passport Authentication
var passport = require('passport');

// variable to see if the person logged in
var loggedIn = 0;


// main page route
router.get('/', function (req, res) {

  burger.all(function (data) {
    var hbsObject = { burgers: data, bobo: loggedIn };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });

});

// create a new entry
// requre github authentication
router.post('/create', function (req, res) {


  if(loggedIn == 0){

    console.log("user can't UPDATE -- didn't authenticate");
    res.redirect('/');

  }else{

    burger.create(['plan', 'vote'], [req.body.plan, 1], function () {
      res.redirect('/');
    });

  }

}); // end of create


router.put('/update/:id/:ss', function (req, res) {

  if(loggedIn == 0){

    console.log("user can't VOTE -- didn't authenticate");
    res.redirect('/');

  }else{

    var condition = 'id = ' + req.params.id;

    var updateNumber = req.params.ss;

    console.log('condition ', condition);

    burger.update({ vote: updateNumber }, condition, function () {
      res.redirect('/');
    });

  }

}); // end of update



var stripe = require("stripe")("sk_test_0KQEJUx0c4wjut7VcRNluN4F");


router.post('/charge', function(req,res){

  console.log("/charge was run");

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

}); // end of stripe


// gitHub stuff

router.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){});


router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    console.log("ta da!");
    loggedIn = 1;
    console.log(loggedIn);
    res.redirect('/');
  });

// end of gitHub



module.exports = router;