$('#partner-menu-btn').addClass('active');

$('#partner-contact-us').on('click', function() {
  $('#partner-contact-us-form')[0].scrollIntoView({ behavior: 'smooth' });
});

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

function dashboardPage() {
  const page = document.URL.split(/[?#]/)[0].split('/').pop();

  switch(page) {
    case 'candidate-management.html':
      authoriseAccess()
      activeMenuBar('#candidate-management-sidebar', '#candidate-management-footbar')
      activeIndicator('.level-bar-item')
      populateCandidatesExamtime()
      populateCandidates()
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

function getLocalLang(key) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : 'zh';
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

$('.level-bar-item').on('click', function() {
  $('#exam-time').children().not(':first').remove();
  $('#candidate-table').empty();
  let test_time = $('#exam-time').val();
  let level = parseInt($('.level-bar-item.active').attr('data-level'));
  populateCandidatesExamtime(level)
  populateCandidates(level, test_time)
})

$('#exam-time').on('change', function() {
  $('#candidate-table').empty();
  let test_time = $(this).val();
  let level = parseInt($('.level-bar-item.active').attr('data-level'));
  populateCandidates(level, test_time)
})

async function populateCandidatesExamtime(level) {
  let candidates = await fetchAPI('https://api.hskk.org/webapi/partner_test_info_overview/');
  
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

async function populateCandidates(level, test_time) {
  let lang = getLocalLang('lang');
  let candidates = await fetchAPI('https://api.hskk.org/webapi/partner_test_info_overview/');
  
  if (candidates) {
    candidates.forEach(function(candidate, index) {
      const candidate_table = $('#candidate-table')[0];
      const candidate_table_template = document.createElement('template');

      if (candidate.level == level && candidate.test_time == test_time) {
        candidate_table_template.innerHTML = `
          <tr>
            <th scope='row'>${index+1}</th>
            <td>${ lang == 'zh' ? candidate.name_cn : candidate.name_en }</td>
            <td class='column-${index}'><i class='fa-solid fa-eye' data-id='${index}'></i></td>
            <td class='card-password-${index} d-none'>${candidate.card_password}</td>
          </tr>
        `;
      } else if (candidate.level == level && test_time == '') {
        candidate_table_template.innerHTML = `
          <tr>
            <th scope='row'>${index+1}</th>
            <td>${ lang == 'zh' ? candidate.name_cn : candidate.name_en }</td>
            <td class='column-${index}'><i class='fa-solid fa-eye' data-id='${index}'></i></td>
            <td class='card-password-${index} d-none'>${candidate.card_password}</td>
          </tr>
        `;
      } else if (level == 0 && candidate.test_time == test_time) {
        candidate_table_template.innerHTML = `
          <tr>
            <th scope='row'>${index+1}</th>
            <td>${ lang == 'zh' ? candidate.name_cn : candidate.name_en }</td>
            <td class='column-${index}'><i class='fa-solid fa-eye' data-id='${index}'></i></td>
            <td class='card-password-${index} d-none'>${candidate.card_password}</td>
          </tr>
        `;
      } else if (level == 0 && test_time == '') {
        candidate_table_template.innerHTML = `
          <tr>
            <th scope='row'>${index+1}</th>
            <td>${ lang == 'zh' ? candidate.name_cn : candidate.name_en }</td>
            <td class='column-${index}'><i class='fa-solid fa-eye' data-id='${index}'></i></td>
            <td class='card-password-${index} d-none'>${candidate.card_password}</td>
          </tr>
        `;
      } else if (level == undefined && candidate.test_time == test_time) {
        candidate_table_template.innerHTML = `
          <tr>
            <th scope='row'>${index+1}</th>
            <td>${ lang == 'zh' ? candidate.name_cn : candidate.name_en }</td>
            <td class='column-${index}'><i class='fa-solid fa-eye' data-id='${index}'></i></td>
            <td class='card-password-${index} d-none'>${candidate.card_password}</td>
          </tr>
        `;
      } else if (level == undefined && test_time == '') {
        candidate_table_template.innerHTML = `
          <tr>
            <th scope='row'>${index+1}</th>
            <td>${ lang == 'zh' ? candidate.name_cn : candidate.name_en }</td>
            <td class='column-${index}'><i class='fa-solid fa-eye' data-id='${index}'></i></td>
            <td class='card-password-${index} d-none'>${candidate.card_password}</td>
          </tr>
        `;
      } else if (level == undefined) {
        candidate_table_template.innerHTML = `
          <tr>
            <th scope='row'>${index+1}</th>
            <td>${ lang == 'zh' ? candidate.name_cn : candidate.name_en }</td>
            <td class='column-${index}'><i class='fa-solid fa-eye' data-id='${index}'></i></td>
            <td class='card-password-${index} d-none'>${candidate.card_password}</td>
          </tr>
        `;
      }
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