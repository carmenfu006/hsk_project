window.addEventListener('DOMContentLoaded', async () => {
  const {stripePublicKey} = await fetch('/config').then(r => r.json())
  const stripe = Stripe(stripePublicKey)

  // var data = { amount: '3000'}

  // const {clientSecret} = await fetch('/create-payment-intent', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // }).then(r => r.json())

  const elements = stripe.elements({ clientSecret : 'pi_3NxsyKArZBHZvCDs1q8Has5i_secret_1W9xy4bkKqxRXsk1t1w4d3m6s' });
  
  // const elements = stripe.elements({ clientSecret });
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');
})