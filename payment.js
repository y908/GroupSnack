//========================================PAYMENT JS======================================//

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys


// PUT THIS CODE INTO SERVER !!!!!!!!!!!!!!!!!!!!


// !!!!!!!!!!!!!!!! the below code has an error
var keys = require('./keys.js');
var stripe = require("stripe")(keys.importantKeys.skLiveKey);

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
