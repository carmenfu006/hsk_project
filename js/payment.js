window.addEventListener('DOMContentLoaded', async () => {
  $('#payment-link-invalid').hide();
  // if (user == null) window.location.href = 'candidate-login.html';
  const lang = getLocalLang('lang');
  const payment_id = new URL(location.href).searchParams.get('payment_id');
  const paymentIntentId = payment_id.split('_secret')[0];
  const stripe = Stripe('pk_live_51NxVaQArZBHZvCDsIip5DutxzIoCQZ4DIXwNxLZtWiMb2bKBPp7eCH7d4bp1vSvBs8CCdzItKEbaQqn8qTgXz23N00i4I9qDpu', { locale : `${lang}` })

  if (payment_id == null || payment_id == '') {
    document.getElementById('payment-section').style.display = 'none';
    document.getElementById('payment-link-invalid').style.display = 'block';
  } else {
    $('#payment-link-invalid').hide();
    let response = await fetch(`https://api.hskk.org/webapi/order_read_payment/${paymentIntentId}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        // 'Authorization' : `Bearer ${user}`
      }
    })
    let data = await response.json();
    let info = data.data;
    let total_amounts = document.querySelectorAll('.total-amount');
    let currency_displays = document.querySelectorAll('.currency-display');

    if (data.code == 200) {
      if (info.payment_status != null) {
        document.getElementById('payment-section').style.display = 'none';
        document.getElementById('payment-link-invalid').style.display = 'block';
      } else {
        const clientSecret = payment_id;
        document.getElementById('selected-exam-level').innerHTML = displaySelectedExam(info.test_level);
        total_amounts.forEach(total_amount => {
          total_amount.innerHTML = (parseInt(info.payment_amount)/100).toFixed(2);
        });
        currency_displays.forEach(currency_display => {
          currency_display.innerHTML = (info.payment_currency).toUpperCase();
        });
        const elements = stripe.elements({ clientSecret });
        const paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element');

        const form = document.getElementById('payment-form');
        
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          document.getElementById('payment-btn').disabled = true;

          const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: window.location.origin + '/payment-success.html'
            }
          })
          if (error) {
            $('.toast').toast('show');
            document.getElementById('payment-btn').disabled = false;
          }
        })

        if (info.coupon_code != null) {
          document.getElementById('discount-code').readOnly = true;
          document.getElementById('discount-code').value = info.coupon_code;
          document.getElementById('discount-error-message').classList.add('d-none');
          document.getElementById('discount-success-message').classList.remove('d-none');
          document.getElementById('verify-code').disabled = true;
        }
      }
    }
  }

  // Discount and update paymentIntent
  const verify_code = document.getElementById('verify-code');
  const discount_field = document.getElementById('discount-code');
  
  discount_field.addEventListener('keyup', function() {
    if (discount_field.value != '') {
      verify_code.disabled = false;
    } else {
      verify_code.disabled = true;
    }
  })

  verify_code.addEventListener('click', async (e) => {
    e.preventDefault();
    verify_code.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

    let discount_code = document.getElementById('discount-code').value;

    let response = await fetch(`https://api.hskk.org/webapi/order_read_payment/${paymentIntentId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        // 'Authorization' : `Bearer ${user}`
      },
      body: JSON.stringify({
        coupon: discount_code
      })
    })
    let data = await response.json();
    let total_amounts = document.querySelectorAll('.total-amount');
    let discount_error_message = document.getElementById('discount-error-message');
    let discount_success_message = document.getElementById('discount-success-message');

    if (data.code == 200) {
      let info = data.data;
      total_amounts.forEach(total_amount => {
        total_amount.innerHTML = (parseInt(info.payment_amount)/100).toFixed(2);
      });
      applyText(lang, verify_code, '应用', 'Apply', 'Aplikasi', 'تطبيق');
      verify_code.style.backgroundColor = '#3FD3C3';
      discount_error_message.classList.add('d-none')
      discount_success_message.classList.remove('d-none')
    } else {
      discount_error_message.classList.remove('d-none')
      discount_success_message.classList.add('d-none')
      applyText(lang, verify_code, '应用', 'Apply', 'Aplikasi', 'تطبيق');
    }
    checkPaymentAmount()
  })

  function getSession(key) {
    return sessionStorage.getItem(key);
  }
  
  function applyText(lang, target, zh_hans, en, id, ar) {
    if (lang == null || lang == 'zh-hans' || lang == 'zh-hant') {
      target.innerHTML = zh_hans;
    } else if (lang == 'en') {
      target.innerHTML = en
    } else if (lang == 'id') {
      target.innerHTML = id
    } else if (lang == 'ar') {
      target.innerHTML = ar
    }
  }

  function displaySelectedExam(exam_level) {
    switch(exam_level) {
      case 7:
        return transLang(lang, 'HSK⼝语(初级)移动端考試', 'HSK Oral (Elementary) Mobile Exam', 'Ujian Mobile HSK Lisan (Dasar)', 'اختبار HSK للتحدث (الابتدائي) عبر الهاتف المحمول')
        break;
      case 8:
        return transLang(lang, 'HSK⼝语(中级)移动端考試', 'HSK Oral (Intermediate) Mobile Exam', 'Ujian Mobile HSK Lisan (Menengah)', 'اختبار التحدث باللغة HSK (المتوسط) عبر الهاتف المحمول')
        break;
      case 9:
        return transLang(lang, 'HSK⼝语(高级)移动端考試', 'HSK Oral (Advanced) Mobile Exam', 'Ujian Mobile HSK Lisan (Lanjutan)', 'اختبار HSK للتحدث (المتقدم) عبر الهاتف المحمول')
        break;
      default:
        return transLang(lang, 'HSK⼝语(初级)移动端考試', 'HSK Oral (Elementary) Mobile Exam', 'Ujian Mobile HSK Lisan (Dasar)', 'اختبار HSK للتحدث (الابتدائي) عبر الهاتف المحمول')
    }
  }

  function transLang(lang, zh_hans, en, id, ar) {
    switch(lang) {
      case 'zh-hans':
        return zh_hans
        break;
      case 'zh-hant':
        return zh_hans
        break;
      case 'en':
        return en
        break;
      case 'id':
        return id
        break;
      case 'ar':
        return ar
        break;
      default:
        return zh_hans
    }
  }

  function getLocalLang(key) {
    return localStorage.getItem(key) ? localStorage.getItem(key) : 'zh-hans';
  }

  async function checkPaymentAmount() {
    let response = await fetch(`https://api.hskk.org/webapi/order_read_payment/${paymentIntentId}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        // 'Authorization' : `Bearer ${user}`
      }
    })
    let data = await response.json();
    let info = data.data;

    let verify_code = document.getElementById('verify-code');
    let discount_code = document.getElementById('discount-code');
    let discount_error_message = document.getElementById('discount-error-message');
    let discount_success_message = document.getElementById('discount-success-message');

    if (data.code == 200) {
      if (info.coupon_code != null) {
        discount_code.readOnly = true;
        discount_code.value = info.coupon_code;
        discount_error_message.classList.add('d-none');
        discount_success_message.classList.remove('d-none');
        verify_code.disabled = true;
      }
    }
  }
})
