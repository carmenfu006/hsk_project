addRecaptchaToHead()

$('#to-candidate-dashboard').on('click', async(e) => {
  e.preventDefault();
  let lang = getSession('lang');
  const captchaResponse = grecaptcha.getResponse()

  if (captchaResponse === undefined || captchaResponse === '' || captchaResponse === null) {
    toastLang('Recaptcha not checked')
    $('.toast').toast('show');
  } else {

    let response = await fetch('https://api.hskk.info/webapi/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Accept-Language': lang
      },
        body: JSON.stringify({
          email: inputVal('#email'),
          verify_code: inputVal('#verify_code')
        })
    })
    let data = await response.json();

    if (data.code == 200) {
      let user_token = data.data.access;
      $('.toast').toast('hide');
      localStorage.setItem('user', user_token);
      window.location.replace($('#to-candidate-dashboard')[0].form.action);
    } else if (data.code == 400) {
      toastMessage(data.msg)
      $('.toast').toast('show');
    }
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

$('#verification-code-btn').on('click', async(e) => {
  e.preventDefault();
  let lang = getSession('lang');
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

  let response = await fetch('https://api.hskk.info/webapi/send_verify_code/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Accept-Language': lang
      },
        body: JSON.stringify({
          email: inputVal('#email')
        })
    })
  let data = await response.json();

  if (data.code == 200) {
    $('.toast').toast('hide');
  } else if (data.code == 400) {
    timeleft = 0;
    toastMessage(data.msg)
    $('.toast').toast('show');
  }
});

function codeLang(classname) {
  let lang = getSession('lang');

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
  let lang = getSession('lang');

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
  let lang = getSession('lang');

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

function addRecaptchaToHead() {
  let lang = getSession('lang');
  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/api.js?hl=${lang}`;

  document.head.appendChild(script);
}

function getSession(key) {
  return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : 'zh';
}

function inputVal(id) {
  return $(id).val()
}