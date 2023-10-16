window.addEventListener('DOMContentLoaded', async () => {
  const lang = getSession('lang') ? getSession('lang') : 'zh';
  // const {stripePublicKey} = await fetch('/config').then(r => r.json())
  const stripe = Stripe('pk_test_51NxVaQArZBHZvCDsV7skPBV3kedEbXpekrZs98aWWjiPSqlECB25Ppsjdwps66A3FQ3CHLGnmSAAmHbAmj7931XE00FawLsIN4', { locale : `${lang}` })

  // let data = { amount: 26000, customer: 'dummy'}

  // const {clientSecret} = await fetch('/create-payment-intent', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // }).then(r => r.json())

  const clientSecret = 'pi_3Ny66eArZBHZvCDs1A7jgrhZ_secret_d5uRkrCqAwPhfLkA28lV3TKQw'

  const elements = stripe.elements({ clientSecret });
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
      $('.toast').toast('show');
    }
  })
  
  // Discount and update paymentIntent
  const verify_code = $('#verify-code');
  const discount_field = $('#discount-code');
  const discount_error_message = $('#discount-error-message');
  
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
    let currentAmount = 26000;
    // // let currentAmount = data.amount;
    let finalAmount = currentAmount - discountValue;

    // let paymentIntentId = clientSecret.split('_secret')[0];

    // let updatedData = { paymentIntentId: paymentIntentId, amount: finalAmount }

    // const updatePaymentIntents = await fetch('/update-payment-intent', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(updatedData)
    // }).then(r => r.json())

    const updatePaymentIntents = ({'status': 'complete'})

    console.log(updatePaymentIntents.status)

    if (updatePaymentIntents.status == 'complete') {
      $('.total-amount').html((finalAmount/100).toFixed(2))
      applyText(lang, verify_code, '应用', 'Apply', 'Aplikasi', 'تطبيق');
      verify_code.css('background-color', '#3FD3C3')
      $('#discount-error-message').addClass('d-none')
      $('#discount-success-message').removeClass('d-none')
    } else {
      $('#discount-error-message').removeClass('d-none')
      $('#discount-success-message').addClass('d-none')
    }
  })

  function getSession(key) {
    return sessionStorage.getItem(key);
  }
  
  function applyText(lang, target, zh, en, id, ar) {
    if (lang == null || lang == 'zh') {
      target.html(zh);
    } else if (lang == 'en') {
      target.html(en);
    } else if (lang == 'id') {
      target.html(id);
    } else if (lang == 'ar') {
      target.html(ar);
    }
  }
})