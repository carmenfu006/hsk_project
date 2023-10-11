if (user == null) window.location.href = 'candidate-login';

$('#apply-menu-btn').addClass('active');

$('.toggle').click(function(){
  $('.month').toggleClass("justify-content-end");
  $('.toggle').toggleClass("text-light");
});

progressIndicator()

function progressIndicator() {
  const progressbar = document.getElementById('progressbar');
  const progressbar_template = document.createElement('template');
  const page = document.URL.split(/[?#]/)[0].split('/').pop();
  
  progressbar_template.innerHTML = `
    <div class='progress-indicator-width'>
      <div class='row progress-indicator-bar'>
        <div class='progress-indicator-dot step-1'></div>
        <div class='progress-indicator-line m-1 step-2'></div>
        <div class='progress-indicator-dot step-2'></div>
        <div class='progress-indicator-line m-1 step-3'></div>
        <div class='progress-indicator-dot step-3'></div>
        <div class='progress-indicator-line m-1 step-4'></div>
        <div class='progress-indicator-dot step-4'></div>
        <div class='progress-indicator-line m-1 step-5'></div>
        <div class='progress-indicator-dot step-5'></div>
      </div>
      <div class='row text-center'>
        <div class='col i18n-66 progress-indicator-word step-1'>选择考期</div>
        <div class='col i18n-83 progress-indicator-word step-2'>考生资料</div>
        <div class='col i18n-110 progress-indicator-word step-3'>上传照片</div>
        <div class='col i18n-123 progress-indicator-word step-4'>考生信息确认</div>
        <div class='col progress-indicator-word step-5'>预报名已提交</div>
      </div>
    </div>`;

  if (progressbar) progressbar.appendChild(progressbar_template.content);

  switch(page) {
    case 'application.html':
      activeProgressBar('.step-1');
      activeClick('.month-item');
      checkboxSelect('.exam-datetime', true, '#exam-datetime');
      enabledNextBtn();
      break;
    case 'application-candidate-info.html':
      activeProgressBar('.step-1, .step-2');
      checkboxSelect('.gender', true, '#gender');
      checkboxSelect('.hsk', true, '#hsk', '#hsk-date');
      checkboxSelect('.hskk', true, '#hskk', '#hskk-date');
      enabledNextBtn();
      populateYear('#birth-year');
      populateYear('#hsk-year');
      populateYear('#hskk-year');
      populateMonth('#birth-month');
      populateMonth('#hsk-month');
      populateMonth('#hskk-month');
      populateDay('#birth-day');
      populateDay('#hsk-day');
      populateDay('#hskk-day');
      break;
    case 'application-candidate-profile.html':
      activeProgressBar('.step-1, .step-2, .step-3');
      loadFile();
      enabledNextBtn();
      break;
    case 'application-verify-info.html':
      activeProgressBar('.step-1, .step-2, .step-3, .step-4');
      populateInfo();
      $('#verify-profile').attr('src', getSession('file'));
      break;
    case 'application-submit.html':
      activeProgressBar('.step-1, .step-2, .step-3, .step-4, .step-5');
      break;
    default:
      activeProgressBar('.step-1');
  }
}

function activeProgressBar(classname) {
  $(classname).addClass('active');
}

function enabledNextBtn() {
  $(':input').on('change click keyup', function() {

    if (verifyInput('#exam-datetime') && verifyInput('#exam-amount') && verifyCheckInput('#terms')) {
      $('#to-step-2').attr('disabled', false);
    } else {
      $('#to-step-2').attr('disabled', true);
    }

    if (verifyInput('#gender') && verifyInput('#hsk') && verifyInput('#hskk') && verifyInput('#username') && verifyInput('#firstname') && verifyInput('#lastname') && verifyInput('#birth-year') && verifyInput('#birth-month') && verifyInput('#birth-day') && verifyInput('#nationality') && verifyInput('#native-language') && verifyInput('#identity-type') && verifyInput('#identity') && verifyInput('#country-code') && verifyInput('#contact-number')) {
      $('#to-step-3').attr('disabled', false);
    } else {
      $('#to-step-3').attr('disabled', true);
    }

    if (verifyInput('#file')) {
      $('#to-step-4').attr('disabled', false);
    } else {
      $('#to-step-4').attr('disabled', true);
    }
  })
}

function loadFile() {
  let imageTag = $('#output');

  checkFile(imageTag)

  $('#file').change(function() {
    const file = this.files[0];

    if (file) {
      let reader = new FileReader();
      reader.onload = function(event){
        imageTag.attr('src', URL.createObjectURL(file));
        checkFile(imageTag)
        setSession('file', event.target.result);
      }
      reader.readAsDataURL(file);
    }
  });

  $('.fa-trash').click(function() {
    imageTag.attr('src', '')
    $('#file').val('');
    $('#to-step-4').attr('disabled', true);
    checkFile(imageTag)
  })
}

function checkFile(imageTag) {
  let imageUpload = $('.image-upload');
  let imageDisplay = $('.image-display');

  if (imageTag.attr('src') == '') {
    imageUpload.removeClass('d-none');
    imageDisplay.addClass('d-none');
  } else {
    imageUpload.addClass('d-none');
    imageDisplay.removeClass('d-none');
  }
}

function setSession(key, value) {
  sessionStorage.setItem(key, value);
}

function getSession(key) {
  return sessionStorage.getItem(key);
}

function activeClick(classname) {
  $(classname).on('click', function() {
    $(classname).removeClass('active');
    $(this).addClass('active');
  });
}

function checkboxSelect(classname, setInputVal, inputId, targetId) {
  $(classname).on('change', function() {
    $(classname).prop('checked', false);

    if($(this).is(':checked')) {
      $(this).prop('checked', false);
    } else {
      $(this).prop('checked', true);
    }

    if (setInputVal) {
      $(inputId).val($(this).val())

      if ($(inputId).val() === 'yes') {
        $(targetId).removeClass('d-none');
      } else {
        $(targetId).addClass('d-none');
      }
    }
    
  });
}

function verifyInput(id) {
  if ($(id).val() === '') {
    return false;
  } else {
    return true;
  }
}

function verifyCheckInput(id) {
  return $(id).is(':checked')
}

function inputVal(id) {
  return $(id).val()
}

function setItemCart() {
  if (user == null) {
    $('#apply-menu-btn').remove()
    $('#user-login').remove()
  } else {
    $('#apply-modal-btn').remove()
    $('#user-public').remove()
  }
}

$('#to-step-2').on('click', function(e) {
  setSession('exam-location', inputVal('#exam-location'));
  setSession('exam-level', inputVal('#exam-level'));
  setSession('exam-datetime', inputVal('#exam-datetime'));
  setSession('exam-amount', inputVal('#exam-amount'));
  setSession('terms', inputVal('#terms'));

  window.location.replace($(this)[0].form.action);
});

$('#to-step-3').on('click', function(e) {
  setSession('gender', inputVal('#gender'));
  setSession('hsk', inputVal('#hsk'));
  setSession('hskk', inputVal('#hskk'));
  setSession('username', inputVal('#username'));
  setSession('firstname', inputVal('#firstname'));
  setSession('lastname', inputVal('#lastname'));
  setSession('birth-year', inputVal('#birth-year'));
  setSession('birth-month', inputVal('#birth-month'));
  setSession('birth-day', inputVal('#birth-day'));
  setSession('nationality', inputVal('#nationality'));
  setSession('native-language', inputVal('#native-language'));
  setSession('identity-type', inputVal('#identity-type'));
  setSession('identity', inputVal('#identity'));
  setSession('country-code', inputVal('#country-code'));
  setSession('contact-number', inputVal('#contact-number'));
  setSession('learning-time', inputVal('#learning-time'));

  if (inputVal('#hsk') == 'yes') {
    setSession('hsk-year', inputVal('#hsk-year'));
    setSession('hsk-month', inputVal('#hsk-month'));
    setSession('hsk-day', inputVal('#hsk-day'));
  }
  if (inputVal('#hskk') == 'yes') {
    setSession('hskk-year', inputVal('#hskk-year'));
    setSession('hskk-month', inputVal('#hskk-month'));
    setSession('hskk-day', inputVal('#hskk-day'));
  }
  window.location.replace($(this)[0].form.action);
});

function populateInfo() {
  if ($('.info-username')) $('.info-username').html(getSession('username'));
  if ($('.info-name')) $('.info-name').html(getSession('firstname') + ' ' + getSession('lastname'));
  if ($('.info-gender')) $('.info-gender').html(getSession('gender'));
  if ($('.info-birthday')) $('.info-birthday').html(getSession('birth-year') + '/' + getSession('birth-month') + '/' + getSession('birth-day'));
  if ($('.info-nationality')) $('.info-nationality').html(getSession('nationality'));
  if ($('.info-native-language')) $('.info-native-language').html(getSession('native-language'));
  if ($('.info-identity-type')) $('.info-identity-type').html(getSession('identity-type'));
  if ($('.info-identity')) $('.info-identity').html(getSession('identity'));
  if ($('.info-contact-number')) $('.info-contact-number').html(getSession('country-code') + '-' + getSession('contact-number'));
  if ($('.info-learning-time')) $('.info-learning-time').html(getSession('learning-time'));
  if ($('.info-hsk')) $('.info-hsk').html(getSession('hsk'));
  if ($('.info-hskk')) $('.info-hskk').html(getSession('hskk'));
}

function populateYear(id) {
  let select_year = $(id);
  let currentYear = (new Date()).getFullYear();
  if (select_year) {
    for (let i = currentYear; i >= currentYear-100; i--) {
      let option = document.createElement('option');
      option.value = i;
      option.text = i;
      select_year[0].appendChild(option)
    }
  }
}

function populateMonth(id) {
  let select_month = $(id);
  if (select_month) {
    for (let i = 1; i <= 12; i++) {
      let option = document.createElement('option');
      option.value = i;
      option.text = i;
      select_month[0].appendChild(option)
    }
  }
}

function populateDay(id) {
  let select_day = $(id);
  if (select_day) {
    for (let i = 1; i <= 31; i++) {
      let option = document.createElement('option');
      option.value = i;
      option.text = i;
      select_day[0].appendChild(option)
    }
  }
}