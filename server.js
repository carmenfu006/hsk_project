if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
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

app.get('/payment', async (req, res) => {
  res.render('payment')
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

app.post('/update-payment-intent', async (req, res) => {
  var amount = req.body.amount;
  var paymentIntentId = req.body.paymentIntentId;

  const paymentIntent = await stripe.paymentIntents.update(
    paymentIntentId,
    { amount: amount }
  )
  res.status(200).send({status: 'complete'})
})

app.listen(3000)