if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require("stripe")(stripeSecretKey);

const express = require('express');
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const https = require('https');
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

app.get('/candidate-login', async (req, res) => {
  res.render('candidate-login')
})

app.get('/partner-login', async (req, res) => {
  res.render('partner-login')
})

app.post('/recaptcha', (req, res) => {
  if (req.body.captchaResponse === undefined || req.body.captchaResponse === '' || req.body.captchaResponse === null) {
    return res.json({'status': false, 'message' : '1'})
  }

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${req.body.captchaResponse}`;

  https.get(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk
    })

    response.on('end', () => {
      return res.json({'status' : true})
    })
  })
  .on('error', (error) => {
    return res.json({'status' : false})
  })

})

app.listen(3000)