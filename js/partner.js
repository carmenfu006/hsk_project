// partner.js applies to partner.html and partner dashboard pages.

// To indicate selected partner page.
$('#partner-menu-btn').addClass('active');

// To scroll to partner form when clicked.
$('#partner-contact-us').on('click', function() {
  $('#partner-contact-us-form')[0].scrollIntoView({ behavior: 'smooth' });
});

// Partner FAQs collapse and expand behavior.
$('.collapse')
.on('show.bs.collapse', function () {
  $(this)
    .prev('.card-header')
    .find('.fa')
    .removeClass('fa-plus')
    .addClass('fa-minus');
})
.on('hide.bs.collapse', function () {
  $(this)
    .prev('.card-header')
    .find('.fa')
    .removeClass('fa-minus')
    .addClass('fa-plus');
});

dashboardPage()

// Execute functions according to different partner dashboard pages.
function dashboardPage() {
  const page = document.URL.split(/[?#]/)[0].split('/').pop();

  switch(page) {
    case 'candidate-management.html':
      authoriseAccess()
      activeMenuBar('#candidate-management-sidebar', '#candidate-management-footbar')
      activeIndicator('.level-bar-item')
      populateCandidatesExamtime(0)
      populateCandidates(0, '')
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

// To indicate selected page on sidebar and footbar.
function activeMenuBar(sidebarId, footbarId) {
  $(sidebarId).addClass('active');
  $(footbarId).addClass('active');
}

// Filter indication for candidate-management.html
function activeIndicator(classname) {
  $(classname).on('click', function(event) {
    $(classname).removeClass('active');
    $(this).addClass('active')
  })
}

// To prevent unauthorized access to partner dashboard.
function authoriseAccess() {
  if (partner == null) window.location.href = window.location.origin + '/partner-login.html'
}

// To get preferred language from local storage. Default value is 'zh-hans'.
function getLocalLang(key) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : 'zh-hans';
}

// To get input value.
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

// To have red warning for input field.
function invalidInput(id) {
  $(id).addClass('invalid');
}

// To remove red warning from input field.
function validInput(id) {
  $(id).removeClass('invalid');
}

// Eventlistener for submitting partner collaboration form.
$('#partner-form-btn').on('click', async(e) => {
  e.preventDefault();
  let lang = getLocalLang('lang');

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
      
      let response = await fetch('https://api.hskk.org/webapi/partner/', {
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

// To display language accordingly.
function convertLang(lang, zh_hans, en, id, ar) {
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
      return zh
  }
}

// To remove red warning of input field when after input field is not fulfilled.
$('#phone, #phone_zone').on('keyup', function() {
  validInput('#phone');
  validInput('#phone_zone');
})

// To remove red warning of input field when after input field is not fulfilled.
$('#email').on('keyup', function() {
  validInput('#email');
})

// To fetch API
async function fetchAPI(api) {
  let response = await fetch(api, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${partner}`
      }
    })
  let data = await response.json();
  let records = data.data;

  return records
}

// To display of student records based on selected level and exam time.
$('.level-bar-item').on('click', function() {
  $('#exam-time')[0].replaceChildren($('#exam-time')[0].firstElementChild);
  $('#candidate-table')[0].replaceChildren();
  let test_time = $('#exam-time').val();
  let level = parseInt($('.level-bar-item.active').attr('data-level'));
  populateCandidatesExamtime(level)
  populateCandidates(level, test_time)
})

// To display of student records based on selected exam time.
$('#exam-time').on('change', function() {
  $('#candidate-table').empty();
  let test_time = $(this).val();
  let level = parseInt($('.level-bar-item.active').attr('data-level'));
  populateCandidates(level, test_time)
})

// To retrieve student records by level by calling API.
async function populateCandidatesExamtime(level) {
  let candidates;
  if (level == undefined || level == 0) {
    candidates = await fetchAPI('https://api.hskk.org/webapi/partner_test_info_overview');
  } else {
    candidates = await fetchAPI(`https://api.hskk.org/webapi/partner_test_info_overview?level=${level}`);
  }

  if (candidates) {
    let unique_test_time = candidates.filter((obj, index) => {
      return index === candidates.findIndex(o => obj.test_time === o.test_time);
    });

    unique_test_time.forEach(function(candidate) {
      const exam_time = $('#exam-time')[0];
      const exam_time_template = document.createElement('template');

      if (candidate.level == level || level == undefined || level == 0) {
        exam_time_template.innerHTML = `
        <option value='${candidate.test_time}'>${candidate.test_time}</option>
        `;
        exam_time.appendChild(exam_time_template.content);
      }
    });
  }
}

// To retrieve student records by level and exam time by calling API.
async function populateCandidates(level, test_time) {
  let lang = getLocalLang('lang');
  let candidates;

  if ((level == undefined || level == 0) && (test_time == '')) {
    candidates = await fetchAPI('https://api.hskk.org/webapi/partner_test_info_overview');
  } else if (!(level == undefined || level == 0) && (test_time == '')) {
    candidates = await fetchAPI(`https://api.hskk.org/webapi/partner_test_info_overview?level=${level}`);
  } else if ((level == undefined || level == 0) && !(test_time == '')) {
    candidates = await fetchAPI(`https://api.hskk.org/webapi/partner_test_info_overview?test_time=${test_time}`);
  } else if (!(level == undefined || level == 0) && !(test_time == '')) {
    candidates = await fetchAPI(`https://api.hskk.org/webapi/partner_test_info_overview?level=${level}&test_time=${test_time}`);
  }

  if (candidates) {
    candidates.forEach(function(candidate, index) {
      const candidate_table = $('#candidate-table')[0];
      const candidate_table_template = document.createElement('template');

      candidate_table_template.innerHTML = `
        <tr>
          <th scope='row'>${index+1}</th>
          <td>${ lang == 'zh-hans' || lang == 'zh-hant' ? candidate.name_cn : candidate.name_en }</td>
          <td class='column-${index}'><i class='fa-solid fa-eye' data-id='${index}'></i></td>
          <td class='card-password-${index} d-none'>${candidate.card_password}</td>
        </tr>
      `;
      candidate_table.appendChild(candidate_table_template.content);
    });
  }
  $('#total-candidates').html($('#candidate-table').children().length);

  $('.fa-eye').on('click', function() {
    let card_id = $(this).data('id');
    $(`.card-password-${card_id}`).removeClass('d-none');
    $(`.column-${card_id}`).addClass('d-none');
  })
}