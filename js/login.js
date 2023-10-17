$('#to-candidate-dashboard').on('click', function(e) {
  e.preventDefault();
  const captchaResponse = grecaptcha.getResponse()

  if (captchaResponse === undefined || captchaResponse === '' || captchaResponse === null) {
    toastLang('Recaptcha not checked')
    $('.toast').toast('show');
  } else {
    sessionStorage.setItem('user', 'true');
    window.location.replace($(this)[0].form.action);
  }

  // fetch('/recaptcha', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type' : 'application/json'
  //   },
  //     body: JSON.stringify({captchaResponse: captchaResponse})
  // })
  // .then(r => r.json())
  // .then((data) => {
    
  //   if (data.status == true) {
  //     sessionStorage.setItem('user', 'true');
  //     window.location.replace($(this)[0].form.action);
  //   } else {
  //     if (data.message == 'Recaptcha not checked') {
  //       toastLang(data.message)
  //       $('.toast').toast('show');
  //     } else {
  //       toastLang(data.message)
  //       $('.toast').toast('show');
  //     }
  //   }
  // });
});

$('#to-partner-dashboard').on('click', function(e) {
  e.preventDefault();
  const captchaResponse = grecaptcha.getResponse()

  if (captchaResponse === undefined || captchaResponse === '' || captchaResponse === null) {
    toastLang('Recaptcha not checked')
    $('.toast').toast('show');
  } else {
    sessionStorage.setItem('partner', 'true');
    window.location.replace($(this)[0].form.action);
  }

  // fetch('/recaptcha', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type' : 'application/json'
  //   },
  //     body: JSON.stringify({captchaResponse: captchaResponse})
  // })
  // .then(r => r.json())
  // .then((data) => {
  //   if (data.status == true) {
  //     sessionStorage.setItem('partner', 'true');
  //     window.location.replace($(this)[0].form.action);
  //   } else {
  //     if (data.message == 'Recaptcha not checked') {
  //       toastLang(data.message)
  //       $('.toast').toast('show');
  //     } else {
  //       toastLang(data.message)
  //       $('.toast').toast('show');
  //     }
  //   }
  // });
});

$('#verification-code-btn').on('click', function(e) {
  e.preventDefault();
  var timeleft = 60;
  var timer = setInterval(function(){
    if(timeleft == 0){
      $('#verification-code-btn').attr('disabled', false);
      clearInterval(timer);
      codeLang('.i18n-327')
    } else {
      $('#verification-code-btn').attr('disabled', true);
      codeLangTimer('.i18n-327', timeleft)
    }
    timeleft -= 1;
  }, 1000);
});

function codeLang(classname) {
  let lang = sessionStorage.getItem('lang');

  switch(lang) {
    case 'zh':
      $(classname).html('获取验证码');
      break;
    case 'en':
      $(classname).html('Get verification code');
      break;
    case 'id':
      $(classname).html('Dapatkan kode verifikasi');
      break;
    case 'ar':
      $(classname).html('الحصول على رمز التحقق');
      break;
    default:
      $(classname).html('获取验证码');
  }
}

function codeLangTimer(classname, timer) {
  let lang = sessionStorage.getItem('lang');

  switch(lang) {
    case 'zh':
      $(classname).html(`重新获取验证码(${timer}s)`);
      break;
    case 'en':
      $(classname).html(`Get verification code again(${timer}s)`);
      break;
    case 'id':
      $(classname).html(`Dapatkan kode verifikasi lagi(${timer}s)`);
      break;
    case 'ar':
      $(classname).html(`احصل على رمز التحقق مرة أخرى(${timer}s)`);
      break;
    default:
      $(classname).html(`重新获取验证码(${timer}s)`);
  }
}

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