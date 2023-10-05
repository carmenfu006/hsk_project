const stripeSecretKey = 'sk_test_51NxVaQArZBHZvCDsaXxxTsoSwcY9HEpxkmi83rroeqcdGtCazlR170DYipKKyIBq99thed9FCVASO8OOnSgmgJYj00YCN5ewiw'
const stripePublicKey = 'pk_test_51NxVaQArZBHZvCDsV7skPBV3kedEbXpekrZs98aWWjiPSqlECB25Ppsjdwps66A3FQ3CHLGnmSAAmHbAmj7931XE00FawLsIN4'
const stripe = require("stripe")(stripeSecretKey); 

const express = require('express');
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const fs = require('fs')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/application-submit', function(req, res) {
  res.render('application-submit');
})

app.get('/config', (req, res) => {
  res.send({stripePublicKey : stripePublicKey})
})

app.post('/create-payment-intent', async (req, res) => {
  var amount = req.body.amount;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'hkd',
    automatic_payment_methods: { enabled: true }
  })
  res.send({ clientSecret: paymentIntent.client_secret })
})

app.get('/payment', async (req, res) => {
  res.render('payment')
})

app.listen(3000)