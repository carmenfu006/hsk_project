
if (user || partner) {
  $('#candidate-login-mobile-btn').hide();
  $('#partner-login-mobile-btn').hide();
}

setActiveMenu()
loadExamTime()

function setActiveMenu() {
  if (window.location.hash === '') {
    $('#home-menu-btn').addClass('active');
  } else if (window.location.hash === '#home-news') {
    $('#news-menu-btn').addClass('active');
  } else if (window.location.hash === '#home-faqs') {
    $('#faqs-menu-btn').addClass('active');
  }
}

$(window).scroll(function() {
  var top_of_exam_datetime = $('#exam-datetime').offset().top;
  var bottom_of_exam_datetime = $('#exam-datetime').offset().top + $('#exam-datetime').outerHeight();
  var top_of_home_news = $('#home-news').offset().top;
  var bottom_of_home_news = $('#home-news').offset().top + $('#home-news').outerHeight();
  var top_of_home_faqs = $('#home-faqs').offset().top;
  var bottom_of_home_faqs = $('#home-faqs').offset().top + $('#home-faqs').outerHeight();
  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  var top_of_screen = $(window).scrollTop();

  $('.menu-btn').removeClass('active');

  if ((bottom_of_screen > top_of_exam_datetime) && (top_of_screen < bottom_of_exam_datetime)) {
    $("#apply-modal-btn").addClass('active');
  } else if ((bottom_of_screen > top_of_home_news) && (top_of_screen < bottom_of_home_news)){
    $("#news-menu-btn").addClass('active');
  } else if ((bottom_of_screen > top_of_home_faqs) && (top_of_screen < bottom_of_home_faqs)) {
    $("#faqs-menu-btn").addClass('active');
  } else {
    $("#home-menu-btn").addClass('active');
  }
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

$('#more-faq').on('click', function() {
  $(this).hide();
  for (let i = 8; i <= 15; i++) {
    $(`#card-${i}`).removeClass('d-none');
  }
})

async function loadExamTime() {
  let lang = getLocalLang('lang');
  let response = await fetch('https://api.hskk.org/webapi/test_schedule/', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Accept-Language': lang
      }
    })
  let data = await response.json();
  let data_elementary = data.data[0];
  let data_intermediate = data.data[1];
  let data_advanced = data.data[2];

  const exam_time_elementary = $('#exam-time-elementary')[0];
  const exam_time_elementary_template = document.createElement('template');
  const exam_time_intermediate = $('#exam-time-intermediate')[0];
  const exam_time_intermediate_template = document.createElement('template');
  const exam_time_advanced = $('#exam-time-advanced')[0];
  const exam_time_advanced_template = document.createElement('template');

  let datetime_style = {
    'timeZoneName' : 'long',
    'year' : 'numeric',
    'month' : 'short',
    'day' : '2-digit',
    'hour' : '2-digit',
    'minute' : '2-digit'
  }

  data_elementary.forEach(function(item) {
    let event = new Date(item.test_timestamp * 1000);
    exam_time_elementary_template.innerHTML = `
        <p class='card-text'>${event.toLocaleString(convertLang(lang), datetime_style)}</p>
        <hr class='border-bottom'>
    `;
    exam_time_elementary.appendChild(exam_time_elementary_template.content);
  });

  data_intermediate.forEach(function(item) {
    let event = new Date(item.test_timestamp * 1000);
    exam_time_intermediate_template.innerHTML = `
        <p class='card-text'>${event.toLocaleString(convertLang(lang), datetime_style)}</p>
        <hr class='border-bottom'>
    `;
    exam_time_intermediate.appendChild(exam_time_intermediate_template.content);
  });

  data_advanced.forEach(function(item) {
    let event = new Date(item.test_timestamp * 1000);
    exam_time_advanced_template.innerHTML = `
        <p class='card-text'>${event.toLocaleString(convertLang(lang), datetime_style)}</p>
        <hr class='border-bottom'>
    `;
    exam_time_advanced.appendChild(exam_time_advanced_template.content);
  });
}

function getLocalLang(key) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : 'zh';
}

function convertLang(lang) {
  switch(lang) {
    case 'zh':
      return 'zh-HK'
      break;
    case 'en':
      return 'en-AU'
      break;
    case 'id':
      return 'id-ID'
      break;
    case 'ar':
      return 'ar-SA'
      break;
    default:
      return 'zh-HK'
  }
}