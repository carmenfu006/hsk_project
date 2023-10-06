window.addEventListener('DOMContentLoaded', async () => {
  const {stripePublicKey} = await fetch('/config').then(r => r.json())
  const stripe = Stripe(stripePublicKey)

  // let data = { amount: 56000, customer: 'dummy'}

  // const {clientSecret} = await fetch('/create-payment-intent', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // }).then(r => r.json())

  const elements = stripe.elements({ clientSecret : 'pi_3Ny6SFArZBHZvCDs0hSzMrvd_secret_HueDkjb0IdLYSXxoFObnnIxAJ' });
  
  // const elements = stripe.elements({ clientSecret });
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');

  const form = $('#payment-form')
  form.on('submit', async (e) => {
    e.preventDefault();

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/payment-success.html'
      }
    })
    if (error) {
      // toast box
    }
  })

  // Discount and update paymentIntent
  const verify_code = $('#verify-code')
  const discount_field = $('#discount-code')
  
  discount_field.on('keyup', function() {
    if (discount_field.val() != '') {
      verify_code.attr('disabled', false);
    } else {
      verify_code.attr('disabled', true);
    }
  })

  verify_code.on('click', async (e) => {
    e.preventDefault();
    verify_code.html('<i class="fa-solid fa-spinner fa-spin"></i>')

    // let discount_code = $('#discount-code').val();
    
    let discountValue = 6000;
    let currentAmount = 56000;
    // let currentAmount = data.amount;
    let finalAmount = currentAmount - discountValue;

    let paymentIntentId = clientSecret.split('_secret')[0];

    let updatedData = { paymentIntentId: paymentIntentId, amount: finalAmount }

    const updatePaymentIntents = await fetch('/update-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    }).then(r => r.json())

    if (updatePaymentIntents.status == 'complete') {
      $('.total-amount').html((finalAmount/100).toFixed(2))
      verify_code.html('应用')
      verify_code.css('background-color', '#3FD3C3')
    } else {
      // toast box
    }
  })
})