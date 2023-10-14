$('#to-candidate-dashboard').on('click', function(e) {
  e.preventDefault();
  const captchaResponse = grecaptcha.getResponse()

  fetch('/recaptcha', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type' : 'application/json'
    },
      body: JSON.stringify({captchaResponse: captchaResponse})
  })
  .then(r => r.json())
  .then((data) => {
    
    if (data.status == true) {
      sessionStorage.setItem('user', 'true');
      window.location.replace($(this)[0].form.action);
    } else {
      if (data.message == 'Recaptcha not checked') {
        toastLang(data.message)
        $('.toast').toast('show');
      } else {
        toastLang(data.message)
        $('.toast').toast('show');
      }
    }
  });
});

$('#to-partner-dashboard').on('click', function(e) {
  e.preventDefault();
  const captchaResponse = grecaptcha.getResponse()

  fetch('/recaptcha', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type' : 'application/json'
    },
      body: JSON.stringify({captchaResponse: captchaResponse})
  })
  .then(r => r.json())
  .then((data) => {
    if (data.status == true) {
      sessionStorage.setItem('partner', 'true');
      window.location.replace($(this)[0].form.action);
    } else {
      if (data.message == 'Recaptcha not checked') {
        toastLang(data.message)
        $('.toast').toast('show');
      } else {
        toastLang(data.message)
        $('.toast').toast('show');
      }
    }
  });
});

function toastLang(error_type) {
  let lang = sessionStorage.getItem('lang');

  if (error_type == 'Recaptcha not checked') {
    switch(lang) {
      case 'zh':
        toastMessage(error_type, '', '')
        break;
      case 'en':
        toastMessage(error_type, '', '')
        break;
      case 'id':
        toastMessage(error_type, '', '')
        break;
      case 'ar':
        toastMessage(error_type, '', '')
        break;
      default:
        toastMessage(error_type, '', '')
    }
  }

  if (error_type == 'Recaptcha fails') {
    switch(lang) {
      case 'zh':
        toastMessage(error_type, '', '')
        break;
      case 'en':
        toastMessage(error_type, '', '')
        break;
      case 'id':
        toastMessage(error_type, '', '')
        break;
      case 'ar':
        toastMessage(error_type, '', '')
        break;
      default:
        toastMessage(error_type, '', '')
    }
  }
}

function toastMessage(line1, line2, line3) {
  $('.error-line-1').html(line1)
  $('.error-line-2').html(line2)
  $('.error-line-3').html(line3)
}