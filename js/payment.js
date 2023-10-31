window.addEventListener('DOMContentLoaded', async () => {
  $('#payment-link-invalid').hide();
  // if (user == null) window.location.href = 'candidate-login.html';
  const lang = getLocalLang('lang');
  const payment_id = new URL(location.href).searchParams.get('payment_id');
  const paymentIntentId = payment_id.split('_secret')[0];
  const stripe = Stripe('pk_live_51NxVaQArZBHZvCDsIip5DutxzIoCQZ4DIXwNxLZtWiMb2bKBPp7eCH7d4bp1vSvBs8CCdzItKEbaQqn8qTgXz23N00i4I9qDpu', { locale : `${lang}` })

  if (payment_id == null || payment_id == '') {
    $('#payment-section').hide();
    $('#payment-link-invalid').show();
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

    if (data.code == 200) {
      if (info.payment_status != null) {
        $('#payment-section').hide();
        $('#payment-link-invalid').show();
      } else {
        const clientSecret = payment_id;
        $('#selected-exam-level').html(displaySelectedExam(info.test_level));
        $('.total-amount').html((info.payment_amount/100).toFixed(2));
        $('.currency-display').html((info.payment_currency).toUpperCase());
        const elements = stripe.elements({ clientSecret });
        const paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element');

        const form = $('#payment-form');
        form.on('submit', async (e) => {
          e.preventDefault();
          $('#payment-btn').attr('disabled', true);

          const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: window.location.origin + '/payment-success.html'
            }
          })
          if (error) {
            $('.toast').toast('show');
            $('#payment-btn').attr('disabled', false);
          }
        })

        if (info.coupon_code != null) {
          $('#discount-code').prop('readonly', true);
          $('#discount-code').val(info.coupon_code);
          $('#discount-error-message').addClass('d-none');
          $('#discount-success-message').removeClass('d-none');
          $('#verify-code').prop('disabled', true);
        }
      }
    }
  }

  // Discount and update paymentIntent
  const verify_code = $('#verify-code');
  const discount_field = $('#discount-code');
  
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

    let discount_code = $('#discount-code').val();

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

    if (data.code == 200) {
      let info = data.data;
      $('.total-amount').html((parseInt(info.payment_amount)/100).toFixed(2))
      applyText(lang, verify_code, '应用', 'Apply', 'Aplikasi', 'تطبيق');
      verify_code.css('background-color', '#3FD3C3')
      $('#discount-error-message').addClass('d-none')
      $('#discount-success-message').removeClass('d-none')
    } else {
      $('#discount-error-message').removeClass('d-none')
      $('#discount-success-message').addClass('d-none')
      applyText(lang, verify_code, '应用', 'Apply', 'Aplikasi', 'تطبيق');
    }
    checkPaymentAmount()
  })

  function getSession(key) {
    return sessionStorage.getItem(key);
  }
  
  function applyText(lang, target, zh_hans, en, id, ar) {
    if (lang == null || lang == 'zh-hans' || lang == 'zh-hant') {
      target.html(zh_hans);
    } else if (lang == 'en') {
      target.html(en);
    } else if (lang == 'id') {
      target.html(id);
    } else if (lang == 'ar') {
      target.html(ar);
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

    if (data.code == 200) {
      if (info.coupon_code != null) {
        $('#discount-code').prop('readonly', true);
        $('#discount-code').val(info.coupon_code);
        $('#discount-error-message').addClass('d-none');
        $('#discount-success-message').removeClass('d-none');
        $('#verify-code').prop('disabled', true);
      }
    }
  }
})
