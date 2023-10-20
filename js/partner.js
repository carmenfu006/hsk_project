$('#partner-menu-btn').addClass('active');

$('#partner-contact-us').on('click', function() {
  $('#partner-contact-us-form')[0].scrollIntoView({ behavior: 'smooth' });
});

dashboardPage()

function dashboardPage() {
  const page = document.URL.split(/[?#]/)[0].split('/').pop();

  switch(page) {
    case 'candidate-management.html':
      authoriseAccess()
      activeMenuBar('#candidate-management-sidebar', '#candidate-management-footbar')
      activeIndicator('.level-bar-item')
      break;
    case 'support-center.html':
      authoriseAccess()
      activeMenuBar('#support-sidebar', '#support-footbar')
      break;
    case 'faqs.html':
      authoriseAccess()
      activeMenuBar('#faqs-sidebar', '#faqs-footbar')
      break;
  }
}

function activeMenuBar(sidebarId, footbarId) {
  $(sidebarId).addClass('active');
  $(footbarId).addClass('active');
}

function activeIndicator(classname) {
  $(classname).on('click', function(event) {
    $(classname).removeClass('active');
    $(this).addClass('active')
  })
}

function authoriseAccess() {
  if (partner == null) window.location.href = window.location.origin + '/partner-login.html'
}

function getSession(key) {
  return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : 'zh';
}

function inputVal(id) {
  return $(id).val()
}

function verifyInput(id) {
  if ($(id).val() === '') {
    return false;
  } else {
    return true;
  }
}

function verifyEmailVal(email) {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function invalidInput(id) {
  $(id).addClass('invalid');
}

function validInput(id) {
  $(id).removeClass('invalid');
}

$('#partner-form-btn').on('click', async(e) => {
  e.preventDefault();
  let lang = getSession('lang');

  if (verifyInput('#phone') == false) {
    $('#toast-header').addClass('bg-danger-color');
    $('#toast-text').addClass('danger-color');
    invalidInput('#phone_zone');
    invalidInput('#phone');
    $('#toast-text').html(convertLang(lang, '请输入联系电话', 'Please provide your phone number', 'Silakan berikan nomor telepon Anda', 'يرجى تقديم رقم هاتفك'))
    $('.toast').toast('show');
  } else if (verifyInput('#email') == false) {
    $('#toast-header').addClass('bg-danger-color');
    $('#toast-text').addClass('danger-color');
    invalidInput('#email');
    $('#toast-text').html(convertLang(lang, '请输入邮件地址', 'Please provide your email address', 'Silakan berikan alamat email Anda', 'من فضلك اضف بريدك الالكتروني'))
    $('.toast').toast('show');
  } else if (verifyInput('#email') == true) {
    if (verifyEmailVal(inputVal('#email')) == null) {
      $('#toast-header').addClass('bg-danger-color');
      $('#toast-text').addClass('danger-color');
      invalidInput('#email');
      $('#toast-text').html(convertLang(lang, '请输入合法的邮件地址', 'Please enter a valid email address', 'Silakan isi alamat email benar', 'يرجى إدخال عنوان بريد إلكتروني صالح'))
      $('.toast').toast('show');
    } else {
      
      let response = await fetch('https://api.hskk.info/webapi/partner/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type' : 'application/json',
            'Accept-Language': lang
          },
            body: JSON.stringify({
              phone_zone: inputVal('#phone_zone'),
              phone: inputVal('#phone'),
              email: inputVal('#email'),
              description: inputVal('#description'),
            })
        })
      let data = await response.json();

      if (data.code == 200) {
        $('#toast-header').removeClass('bg-danger-color');
        $('#toast-text').removeClass('danger-color');
        $('#toast-text').html(convertLang(lang, '信息已成功发送', 'Message sent successfully', 'Pesan berhasil terkirim', 'تم إرسال الرسالة بنجاح'))
        $('.toast').toast('show');
      } else {
        $('#toast-header').addClass('bg-danger-color');
        $('#toast-text').addClass('danger-color');
        $('#toast-text').html(data.msg)
        $('.toast').toast('show');
      }
    }
  }
});

function convertLang(lang, zh, en, id, ar) {
  switch(lang) {
    case 'zh':
      return zh
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
      return zh
  }
}

$('#phone, #phone_zone').on('keyup', function() {
  validInput('#phone');
  validInput('#phone_zone');
})

$('#email').on('keyup', function() {
  validInput('#email');
})