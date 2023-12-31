// login.js only applies to candidate-login.html and partner-login.html

// Get current preferred language
let lang = getLocalLang('lang');

// Get current html page
const page = document.URL.split(/[?#]/)[0].split('/').pop();

// To prevent logged-in user and partner from accessing candidate login and partner login page.
// If logged-in is a user and tries to access candidate login page, he/she will be directed to application page.
// If logged-in is a user and tries to access partner login page, all local storage and session storage will be erased.
// If logged-in is a partner and tries to access partner login page, he/she will be directed to partner dashboard page.
// If logged-in is a partner and tries to access candidate login page, all local storage and session storage will be erased.
if (user && page == 'candidate-login.html') {
  window.location.href = window.location.origin + '/application.html';
} else if (user && page == 'partner-login.html') {
  clearInfoLocal();
  clearInfoSession();
  location.reload();
} else if (partner && page == 'partner-login.html') {
  window.location.href = window.location.origin + '/partner/candidate-management.html';
} else if (partner && page == 'candidate-login.html') {
  clearInfoLocal();
  clearInfoSession();
  location.reload();
}

// To hide both recaptcha and login interface first to prevent confusion due to China restriction of Google when page loaded.
$('#google-recaptcha').hide();
$('#login-interface').hide();

// To check if Google recaptcha is loaded due to China restriction then only show login interface with or without showing recaptcha.
loaderScript(`https://www.google.com/recaptcha/api.js?hl=${lang}`).then(() => {
  // When Google recaptcha is loaded. Enabled recaptcha verification.
  $('.display-loading').hide();
  $('#login-interface').show();
  $('#google-recaptcha').show();
  $('#to-candidate-dashboard').on('click', async(e) => {
    e.preventDefault();
    const captchaResponse = grecaptcha.getResponse()
    const application = new URL(location.href).searchParams.get('application');
  
    if (captchaResponse === undefined || captchaResponse === '' || captchaResponse === null) {
      toastLang('Recaptcha not checked')
      $('.toast').toast('show');
    } else {
      await candidateLogin(application)
    }
  });
  $('#to-partner-dashboard').on('click', async(e) => {
    e.preventDefault();
    const captchaResponse = grecaptcha.getResponse()
  
    if (captchaResponse === undefined || captchaResponse === '' || captchaResponse === null) {
      toastLang('Recaptcha not checked')
      $('.toast').toast('show');
    } else {
      await partnerLogin()
    }
  });
}).catch(() => {
  // When Google recaptcha cannot be loaded. Skip recaptcha verification.
  $('.display-loading').hide();
  $('#login-interface').show();
  $('#google-recaptcha').hide();
  $('#to-candidate-dashboard').on('click', async(e) => {
    e.preventDefault();
    const application = new URL(location.href).searchParams.get('application');
    await candidateLogin(application)
  });
  $('#to-partner-dashboard').on('click', async(e) => {
    e.preventDefault();
    await partnerLogin()
  });
});

// Eventlistiner for retrieving verification code via email.
$('#verification-code-btn').on('click', async(e) => {
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

  if (verifyEmailVal(inputVal('#email')) != null) {
    let response = await fetch('https://api.hskk.org/webapi/send_verify_code/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Accept-Language': lang
      },
        body: JSON.stringify({
          email: inputVal('#email'),
          lang: lang
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
  } else {
    timeleft = 0;
    invalidInput('#email')
    toastLang('invalid email')
    $('.toast').toast('show');
  }
});

// To remove red warning of input field when after input field is not fulfilled.
$('#email, #verify_code, #username, #password').on('keyup', function() {
  validInput('#email');
  validInput('#verify_code');
  validInput('#username');
  validInput('#password');
})

// To convert language for verification code button.
function codeLang(classname) {
  switch(lang) {
    case 'zh-hans':
      $(classname).html('获取验证码');
      break;
    case 'zh-hant':
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

// To convert language for verification code button with timer shown.
function codeLangTimer(classname, timer) {
  switch(lang) {
    case 'zh-hans':
      $(classname).html(`重新获取验证码(${timer}s)`);
      break;
    case 'zh-hant':
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

// To display error messages according to condition.
function toastLang(error_type) {
  if (error_type == 'Recaptcha not checked') {
    switch(lang) {
      case 'zh-hans':
        toastMessage(error_type, '', '')
        break;
      case 'zh-hant':
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
      case 'zh-hans':
        toastMessage(error_type, '', '')
        break;
      case 'zh-hant':
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

  if (error_type == 'invalid email') {
    switch(lang) {
      case 'zh-hans':
        toastMessage('请输入合法的邮件地址。', '', '')
        break;
      case 'zh-hant':
        toastMessage('请输入合法的邮件地址。', '', '')
        break;
      case 'en':
        toastMessage('Please enter a valid email address.', '', '')
        break;
      case 'id':
        toastMessage('Silakan isi alamat email benar.', '', '')
        break;
      case 'ar':
        toastMessage('يرجى إدخال عنوان بريد إلكتروني صالح.', '', '')
        break;
      default:
        toastMessage('请输入合法的邮件地址。', '', '')
    }
  }

  if (error_type == 'invalid password') {
    switch(lang) {
      case 'zh-hans':
        toastMessage('请输入密码。', '', '')
        break;
      case 'zh-hant':
        toastMessage('请输入密码。', '', '')
        break;
      case 'en':
        toastMessage('Please enter your password.', '', '')
        break;
      case 'id':
        toastMessage('Silakan masukkan kata sandi Anda.', '', '')
        break;
      case 'ar':
        toastMessage('من فضلك أدخل رقمك السري.', '', '')
        break;
      default:
        toastMessage('请输入密码。', '', '')
    }
  }

  if (error_type == 'invalid code') {
    switch(lang) {
      case 'zh-hans':
        toastMessage('请确保验证码至少包含 6 个字符。', '', '')
        break;
      case 'zh-hant':
        toastMessage('请确保验证码至少包含 6 个字符。', '', '')
        break;
      case 'en':
        toastMessage('Please make sure the verification code contains at least 6 characters.', '', '')
        break;
      case 'id':
        toastMessage('Harap pastikan kode verifikasi berisi minimal 6 karakter.', '', '')
        break;
      case 'ar':
        toastMessage('يرجى التأكد من أن رمز التحقق يحتوي على 6 أحرف على الأقل.', '', '')
        break;
      default:
        toastMessage('请确保验证码至少包含 6 个字符。', '', '')
    }
  }

  if (error_type == 'invalid email and code') {
    switch(lang) {
      case 'zh-hans':
        toastMessage('请输入合法的邮件地址。', '请确保验证码至少包含 6 个字符。', '')
        break;
      case 'zh-hant':
        toastMessage('请输入合法的邮件地址。', '请确保验证码至少包含 6 个字符。', '')
        break;
      case 'en':
        toastMessage('Please enter a valid email address.', 'Please make sure the verification code contains at least 6 characters.', '')
        break;
      case 'id':
        toastMessage('Silakan isi alamat email.', 'Harap pastikan kode verifikasi berisi minimal 6 karakter.', '')
        break;
      case 'ar':
        toastMessage('يرجى إدخال عنوان بريد إلكتروني صالح.', 'يرجى التأكد من أن رمز التحقق يحتوي على 6 أحرف على الأقل.', '')
        break;
      default:
        toastMessage('请输入合法的邮件地址。', '请确保验证码至少包含 6 个字符。', '')
    }
  }
}

// To allow display of toast messages
function toastMessage(line1, line2, line3) {
  $('.error-line-1').html(line1)
  $('.error-line-2').html(line2)
  $('.error-line-3').html(line3)
}

// To insert Google Recaptcha script tag with preferred locale.
function addRecaptchaToHead() {
  let lang = getLocalLang('lang');
  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/api.js?hl=${lang}`;

  document.head.appendChild(script);
}

// Get preferred language from local storage. Default to zh-hans.
function getLocalLang(key) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : 'zh-hans';
}

// Get value from local storage.
function getLocal(key) {
  return localStorage.getItem(key);
}

// Get input value.
function inputVal(id) {
  return $(id).val()
}

// Verify existance of input value.
function verifyInput(id) {
  if ($(id).val() === '') {
    return false;
  } else {
    return true;
  }
}

// Verify email value.
function verifyEmailVal(email) {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

// Verify 6 digits code value.
function verifyCodeVal(code) {
  return code.match(/^(\s*\d{6}\s*)(,\s*\d{6}\s*)*,?\s*$/);
}

// To have red warning for input field.
function invalidInput(id) {
  $(id).addClass('invalid');
}

// To remove red warning from input field.
function validInput(id) {
  $(id).removeClass('invalid');
}

// To call user login API when condition is fulfilled.
async function candidateLogin(application) {
  if (verifyEmailVal(inputVal('#email')) == null && verifyCodeVal(inputVal('#verify_code')) == null) {
    invalidInput('#email')
    invalidInput('#input-code')
    toastLang('invalid email and code')
    $('.toast').toast('show');
  } else if (verifyEmailVal(inputVal('#email')) == null) {
    invalidInput('#email')
    toastLang('invalid email')
    $('.toast').toast('show');
  } else if (verifyCodeVal(inputVal('#verify_code')) == null) {
    invalidInput('#input-code')
    toastLang('invalid code')
    $('.toast').toast('show');
  } else if (verifyEmailVal(inputVal('#email')) != null && verifyCodeVal(inputVal('#verify_code')) != null) {
    let response = await fetch('https://api.hskk.org/webapi/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Accept-Language': lang
      },
        body: JSON.stringify({
          email: inputVal('#email'),
          verify_code: inputVal('#verify_code'),
          language: lang
        })
    })
    let data = await response.json();

    if (data.code == 200) {
      clearInfoSession();
      clearInfoLocal();
      $('.toast').toast('hide');
      let info = data.data
      localStorage.setItem('refresh', info.refresh);
      localStorage.setItem('user', info.access);
      localStorage.setItem('expire', info.expire);
      localStorage.setItem('username', info.username);
      localStorage.setItem('first_name', info.first_name);
      localStorage.setItem('first_name_en', info.first_name_en);
      localStorage.setItem('email', info.email);
      localStorage.setItem('user_type', info.user_type);
      localStorage.setItem('is_tester', info.is_tester);
      localStorage.setItem('photo_path', info.photo_path);
      localStorage.setItem('lang', info.language);
      application == 'true' ? window.location.href = window.location.origin + '/application.html' : window.location.replace($('#to-candidate-dashboard')[0].form.action);
    } else {
      toastMessage(data.msg)
      $('.toast').toast('show');
    }
  }
}

// To call partner login API when condition is fulfilled.
async function partnerLogin() {
  if (verifyEmailVal(inputVal('#username')) == null) {
    invalidInput('#username')
    toastLang('invalid email')
    $('.toast').toast('show');
  } else if (verifyInput('#password') == false) {
    invalidInput('#password')
    toastLang('invalid password')
    $('.toast').toast('show');
  } else if (verifyEmailVal(inputVal('#username')) != null && verifyInput('#password')) {
    let response = await fetch('https://api.hskk.org/webapi/login-partner/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Accept-Language': lang
      },
        body: JSON.stringify({
          username: inputVal('#username'),
          password: inputVal('#password')
        })
    })
    let data = await response.json();
    if (data.code == 200) {
      clearInfoSession();
      clearInfoLocal();
      $('.toast').toast('hide');
      let info = data.data;
      localStorage.setItem('refresh', info.refresh);
      localStorage.setItem('partner', info.access);
      localStorage.setItem('expire', info.expire);
      localStorage.setItem('username', info.username);
      localStorage.setItem('first_name', info.first_name);
      localStorage.setItem('first_name_en', info.first_name_en);
      localStorage.setItem('email', info.email);
      localStorage.setItem('user_type', info.user_type);
      localStorage.setItem('is_partner', info.is_partner);
      localStorage.setItem('photo_path', info.photo_path);
      window.location.href = window.location.origin + '/partner/candidate-management.html'
    } else {
      toastMessage(data.msg)
      $('.toast').toast('show');
    }
  }
}

// To check if script tag is loaded with error, specifically for checking Google recaptcha.
function loaderScript(scriptUrl){
  return new Promise(function (res, rej) {
    let script = document.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.onerror = rej;
    script.async = true;
    script.onload = res;
    script.addEventListener('error',rej);
    script.addEventListener('load',res);
    document.head.appendChild(script);
  })
}