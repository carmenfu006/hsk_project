if (user == null) window.location.href = 'candidate-login.html';

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
        <div class='col i18n-124 progress-indicator-word step-5'>预报名已提交</div>
      </div>
    </div>`;

  if (progressbar) progressbar.appendChild(progressbar_template.content);

  switch(page) {
    case 'application.html':
      activeProgressBar('.step-1');
      if (getSession('exam-location') == null && getSession('exam-level') == null) {
        loadExamTime(1, 7);
      } else {
        loadExamTime(getSession('exam-location'), getSession('exam-level'));
      }
      selectLoadExamTime();
      break;
    case 'application-candidate-info.html':
      activeProgressBar('.step-1, .step-2');
      checkboxSelect('.hsk', true, '#hsk', '#hsk-date');
      checkboxSelect('.hskk', true, '#hskk', '#hskk-date');
      enabledNextBtn();
      $('#birthday, #hskday, #hskkday').datepicker({});
      populateNationality('#nationality')
      populateEthnicity('#ethnicity')
      populateNativeLang('#native-language')
      displayEthnicity()
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
    nextBtnStage1()
    nextBtnStage2()
    nextBtnStage3()
  })
}

function nextBtnStage1() {
  if (verifyInput('#exam-datetime') && verifyInput('#exam-amount') && verifyCheckInput('#terms')) {
    $('#to-step-2').attr('disabled', false);
  } else {
    $('#to-step-2').attr('disabled', true);
  }
}

function nextBtnStage2() {
  if (verifyInput('#gender') && verifyInput('#hsk') && verifyInput('#hskk') && verifyInput('#username') && verifyInput('#firstname') && verifyInput('#lastname') && verifyInput('#birth-year') && verifyInput('#birth-month') && verifyInput('#birth-day') && verifyInput('#nationality') && verifyInput('#native-language') && verifyInput('#identity-type') && verifyInput('#identity') && verifyInput('#country-code') && verifyInput('#contact-number') && verifyInputByCondition('#hsk', '#hsk-year', '#hsk-month', '#hsk-day') && verifyInputByCondition('#hskk', '#hskk-year', '#hskk-month', '#hskk-day')) {
    $('#to-step-3').attr('disabled', false);
  } else {
    $('#to-step-3').attr('disabled', true);
  }
}

function nextBtnStage3() {
  if (verifyInput('#file')) {
    $('#to-step-4').attr('disabled', false);
  } else {
    $('#to-step-4').attr('disabled', true);
  }
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

      if ($(this).data('price')) {
        $(targetId).val($(this).data('price'));
      }

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

function verifyInputByCondition(id, targetYear, targetMonth, targetDay) {
  if ($(id).val() == 'yes') {
    if ($(targetYear).val() == '' || $(targetMonth).val() == '' || $(targetDay).val() == '') {
      return false;
    } else {
      return true;
    }
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
  setSession('exam-yearmonth', inputVal('#exam-yearmonth'));
  setSession('terms', inputVal('#terms'));
  setSession('stage1', true);

  window.location.replace($(this)[0].form.action);
});

$('#to-step-3').on('click', function(e) {
  setSession('gender', inputVal('#gender'));
  setSession('hsk', inputVal('#hsk'));
  setSession('hskk', inputVal('#hskk'));
  setSession('username', inputVal('#username'));
  setSession('firstname', inputVal('#firstname'));
  setSession('lastname', inputVal('#lastname'));
  setSession('birthday', inputVal('#birthday'));
  setSession('nationality', inputVal('#nationality'));
  setSession('native-language', inputVal('#native-language'));
  setSession('identity-type', inputVal('#identity-type'));
  setSession('identity', inputVal('#identity'));
  setSession('country-code', inputVal('#country-code'));
  setSession('contact-number', inputVal('#contact-number'));
  setSession('learning-time', inputVal('#learning-time'));

  if (inputVal('#hsk') == 'yes') {
    setSession('hskday', inputVal('#hskday'));
  }
  if (inputVal('#hskk') == 'yes') {
    setSession('hskkday', inputVal('#hskkday'));
  }
  window.location.replace($(this)[0].form.action);
});

function populateInfo() {
  if ($('.info-username')) $('.info-username').html(getSession('username'));
  if ($('.info-name')) $('.info-name').html(getSession('firstname') + ' ' + getSession('lastname'));
  if ($('.info-gender')) $('.info-gender').html(getSession('gender'));
  if ($('.info-birthday')) $('.info-birthday').html(getSession('birthday'));
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

function selectLoadExamTime() {
  $('#exam-location, #exam-level').on('change', function() {
    $('#exam-datetime-selection').empty();
    $('#exam-datetime-options').empty();
    $('#exam-datetime').val('');
    $('#exam-amount').val('');
    $('.exam-datetime').prop('checked', false);
    nextBtnStage1()
    loadExamTime($('#exam-location').val(), $('#exam-level').val())
    updateCartItem()
  })
}

async function loadExamTime(area, level) {
  let lang = getSessionLang('lang');
  let month_options = [];
  let year_options = [];
  let response = await fetch(`https://api.hskk.info/webapi/test_schedule?test_area=${area}&test_level=${level}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json'
      }
    })
  let data = await response.json();
  let exam_time_options = data.data[0];

  if (exam_time_options) {
    exam_time_options.forEach(function(item) {
      let event = new Date(item.test_timestamp * 1000);
      let event_month_value = event.toLocaleString(convertLang('en'), {'month' : '2-digit'})
      let event_month = event.toLocaleString(convertLang(lang), {'month' : 'short'})
      let event_year = event.getFullYear()

      let newMonthObject = {'year' : event_year, 'month' : event_month, 'value' : event_month_value, 'year_month' : event_year + '-' + event_month_value}
      month_options.push(newMonthObject)
      year_options.push(event_year)
    });

    let unique_year = [...new Set(year_options)]
    let unique_year_month = month_options.filter((obj, index) => {
      return index === month_options.findIndex(o => obj.year_month === o.year_month);
    });

    unique_year.forEach(function(item) {
      const exam_datetime_selection = $('#exam-datetime-selection')[0];
      const exam_year_template = document.createElement('template');
      exam_year_template.innerHTML = `
        <div id=${item} class='month-year mr-1 ml-1'>${item}</div>
      `;
      exam_datetime_selection.appendChild(exam_year_template.content);
    });

    unique_year_month.reverse().forEach(function(item) {
      const exam_datetime_year = $(`#${item.year}`)[0];
      let exam_month_template = document.createElement('template');

      if (String(item.year) == exam_datetime_year.innerHTML) {
        exam_month_template = `
        <div class='btn rounded mr-1 ml-1 month-item' data-year-month=${item.year_month}>${item.month}</div>
      `;
        exam_datetime_year.insertAdjacentHTML('afterend', exam_month_template);
      }
    });
  } else {
    unavailableExamDateTimeOptions()
  }

  if ($('.month-item:first')) {
    $('.month-item:first').addClass('active');
      let default_year_month = $('.month-item:first').data('year-month');
      if (exam_time_options) loadSelectedExamTime(default_year_month, exam_time_options)
  }

  $('.month-item').on('click', function() {
    $('#exam-yearmonth').val($(this).attr('data-year-month'));
    $('#exam-datetime').val('');
    $('#exam-amount').val('');
    $('.exam-datetime').prop('checked', false);
    nextBtnStage1()
    if ($(this).hasClass( "active" )) {
      let year_month = $(this).data('year-month');
      $('#exam-datetime-options').empty();
      if (exam_time_options) loadSelectedExamTime(year_month, exam_time_options)
    }
    updateCartItem()
  })

  activeClick('.month-item');
  checkboxSelect('.exam-datetime', true, '#exam-datetime', '#exam-amount');
  enabledNextBtn();

  $('.exam-datetime').on('change', function() {
    updateCartItem()
  });

  if (getSession('stage1') == 'true') loadSessionData1();
}

function loadSelectedExamTime(year_month, exam_time_options) {
  exam_time_options.forEach(function(item, i) {
    let item_date = item.test_date_time.split(' ')[0].split('-');
    let item_year_month = item_date[0] + '-' + item_date[1];
    const exam_datetime_options = $('#exam-datetime-options')[0];
    let exam_date_template = document.createElement('template');

    if (year_month == item_year_month) {
      exam_date_template.innerHTML = `
        <div class='col-lg-6 col-md-6 col-sm-12'>
          <ul class='list-group'>
            <li class='list-group-item list-date rounded-0 border-top-0 border-right-0 border-left-0'>
              <div class='form-check'>
                <input class='form-check-input exam-datetime' type='checkbox' name='checkbox${i}' id='checkbox${i}' value='${item.test_date_time}' data-price='${item.price}'>
                <label class='form-check-label' for='checkbox${i}'>
                  ${item.test_date_time}
                </label>
              </div>
            </li>
          </ul>
        </div>
      `;
      exam_datetime_options.appendChild(exam_date_template.content);
    }
    $('.list-date:last').removeClass('border-top-0 border-right-0 border-left-0')
    $('.list-date:last').addClass('border-0')
  });
}

function displaySelectedDateTime(exam_location, exam_level, exam_datetime, exam_amount) {
  switch(exam_location) {
    case '1':
      selectedDateTimeLocationLevelLang('#selected-exam-location-time', `${exam_datetime} (GMT+08:00), 中国香港`, `${exam_datetime} (GMT+08:00), China Hong Kong`, `${exam_datetime} (GMT+08:00), China Hong Kong`, `${exam_datetime} (GMT+08:00), China Hong Kong`)
      break;
    case '2':
      selectedDateTimeLocationLevelLang('#selected-exam-location-time', `${exam_datetime} (GMT+07:00), 印尼`, `${exam_datetime} (GMT+07:00), Indonesia`, `${exam_datetime} (GMT+07:00), Indonesia`, `${exam_datetime} (GMT+07:00), Indonesia`)
      break;
    case '3':
      selectedDateTimeLocationLevelLang('#selected-exam-location-time', `${exam_datetime} (GMT+04:00), 阿联酋`, `${exam_datetime} (GMT+04:00), United Arab Emirates`, `${exam_datetime} (GMT+04:00), United Arab Emirates`, `${exam_datetime} (GMT+04:00), United Arab Emirates`)
      break;
    case '4':
      selectedDateTimeLocationLevelLang('#selected-exam-location-time', `${exam_datetime} (GMT+10:00), 印尼`, `${exam_datetime} (GMT+10:00), Australia`, `${exam_datetime} (GMT+10:00), Australia`, `${exam_datetime} (GMT+10:00), Australia`)
      break;
    default:
      selectedDateTimeLocationLevelLang('#selected-exam-location-time', `${exam_datetime} (GMT+08:00), 中国香港`, `${exam_datetime} (GMT+08:00), China Hong Kong`, `${exam_datetime} (GMT+08:00), China Hong Kong`, `${exam_datetime} (GMT+08:00), China Hong Kong`)
  }

  switch(exam_level) {
    case '7':
      selectedDateTimeLocationLevelLang('#selected-exam-level', 'HSK⼝语(初级)移动端考試', 'HSK Oral (Elementary) Mobile Exam', 'Ujian Mobile HSK Lisan (Dasar)', 'اختبار HSK للتحدث (الابتدائي) عبر الهاتف المحمول')
      break;
    case '8':
      selectedDateTimeLocationLevelLang('#selected-exam-level', 'HSK⼝语(中级)移动端考試', 'HSK Oral (Intermediate) Mobile Exam', 'Ujian Mobile HSK Lisan (Menengah)', 'اختبار التحدث باللغة HSK (المتوسط) عبر الهاتف المحمول')
      break;
    case '9':
      selectedDateTimeLocationLevelLang('#selected-exam-level', 'HSK⼝语(高级)移动端考試', 'HSK Oral (Advanced) Mobile Exam', 'Ujian Mobile HSK Lisan (Lanjutan)', 'اختبار HSK للتحدث (المتقدم) عبر الهاتف المحمول')
      break;
    default:
      selectedDateTimeLocationLevelLang('#selected-exam-level', 'HSK⼝语(初级)移动端考試', 'HSK Oral (Elementary) Mobile Exam', 'Ujian Mobile HSK Lisan (Dasar)', 'اختبار HSK للتحدث (الابتدائي) عبر الهاتف المحمول')
  }

  $('.selected-exam-amount').html('$' + parseInt(exam_amount).toFixed(2))
}

function selectedDateTimeLocationLevelLang(targetId, zh, en, id, ar) {
  let lang = getSessionLang('lang');
  switch(lang) {
    case 'zh':
      $(targetId).html(zh)
      break;
    case 'en':
      $(targetId).html(en)
      break;
    case 'id':
      $(targetId).html(id)
      break;
    case 'ar':
      $(targetId).html(ar)
      break;
    default:
      $(targetId).html(zh)
  }
}

function updateCartItem() {
  if ($('#exam-datetime').val() != '') {
    displaySelectedDateTime($('#exam-location').val(), $('#exam-level').val(), $('#exam-datetime').val(), $('#exam-amount').val())
    $('#empty-cart').addClass('d-none');
    $('#item-cart').addClass('d-flex');
    $('#item-cart-border').removeClass('d-none');
    $('#item-cart-total').removeClass('d-none');
  } else {
    $('#empty-cart').removeClass('d-none');
    $('#item-cart').removeClass('d-flex');
    $('#item-cart-border').addClass('d-none');
    $('#item-cart-total').addClass('d-none');
  }
}

function unavailableExamDateTimeOptions() {
  let lang = getSessionLang('lang');
  const exam_datetime_options = $('#exam-datetime-options')[0];
  let exam_date_template = document.createElement('template');
  let no_data_lang
  if (lang == 'zh') no_data_lang = '暂时无法提供考试时间';
  if (lang == 'en') no_data_lang = 'The exam time is temporarily unavailable';
  if (lang == 'id') no_data_lang = 'Waktu ujian untuk sementara tidak tersedia';
  if (lang == 'ar') no_data_lang = 'وقت الامتحان غير متاح مؤقتا';
    exam_date_template.innerHTML = `
      <div class='col-lg-6 col-md-6 col-sm-12'>
        <ul class='list-group'>
          <li class='list-group-item list-date rounded-0 border-top-0 border-right-0 border-left-0'>
            <div class='form-check'>
              ${no_data_lang}
            </div>
          </li>
        </ul>
      </div>
    `;
    exam_datetime_options.appendChild(exam_date_template.content);
    $('.list-date:last').removeClass('border-top-0 border-right-0 border-left-0')
    $('.list-date:last').addClass('border-0')
}

function getSessionLang(key) {
  return sessionStorage.getItem(key) ? sessionStorage.getItem(key) : 'zh';
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

function refillField(type, target, data) {
  if (type == 'input' || type == 'option') {
    $(target).val(data);
  }

  if (type == 'checkbox') {
    $(`input[value="${data}"]`).prop('checked', true)
  }

  if (type == 'element') {
    $('div').find(`[data-year-month='${data}']`).click();
  }
}

function loadSessionData1() {
  if (getSession('exam-location')) refillField('input', '#exam-location', getSession('exam-location'));
  if (getSession('exam-level')) refillField('input', '#exam-level', getSession('exam-level'));
  if (getSession('exam-yearmonth')) refillField('element', '.month-item', getSession('exam-yearmonth'));
  if (getSession('exam-datetime')) refillField('checkbox', '#exam-datetime', getSession('exam-datetime'));
  if (getSession('exam-datetime')) refillField('input', '#exam-datetime', getSession('exam-datetime'));
  if (getSession('exam-amount')) refillField('input', '#exam-amount', getSession('exam-amount'));
  if (getSession('terms')) refillField('checkbox', '#terms', getSession('terms'));
  nextBtnStage1()
  updateCartItem()
  setSession('stage1', false);
}

async function populateOptions(api) {
  let response = await fetch(api, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${user}`
      }
    })
  let data = await response.json();
  let options = data.data;

  return options
}

async function populateNationality(id) {
  let lang = getSessionLang('lang');
  let options = await populateOptions('https://api.hskk.info/webapi/nationality/')
  if (options) {
    for (let i = 0; i <= options.length; i++) {
      let option = document.createElement('option');
      option.value = options[i].nationality;
      if (lang == 'zh') {
        option.text = options[i].nationality;
      } else {
        option.text = options[i].nationality_en;
      }
      option.data = options[i].id
      $(id)[0].appendChild(option)
    }
  }
}

async function populateEthnicity(id) {
  let lang = getSessionLang('lang');
  let options = await populateOptions('https://api.hskk.info/webapi/ethnicity/')
  if (options) {
    for (let i = 0; i <= options.length; i++) {
      let option = document.createElement('option');
      option.value = options[i].ethnicity;
      if (lang == 'zh') {
        option.text = options[i].ethnicity;
      } else {
        option.text = options[i].ethnicity_en;
      }
      $(id)[0].appendChild(option)
    }
  }
}

async function populateNativeLang(id) {
  let lang = getSessionLang('lang');
  let options = await populateOptions('https://api.hskk.info/webapi/native_language/')
  if (options) {
    for (let i = 0; i <= options.length; i++) {
      let option = document.createElement('option');
      option.value = options[i].native_language;
      if (lang == 'zh') {
        option.text = options[i].native_language;
      } else {
        option.text = options[i].native_language_en;
      }
      $(id)[0].appendChild(option)
    }
  }
}

function displayEthnicity() {
  $('#ethnicity-selection').hide()
  $('#nationality').on('change', function() {
    let selected = $(this).val();
    if (selected.match('中国')) {
      $('#ethnicity-selection').show()
    } else {
      $('#ethnicity-selection').hide()
    }
  })
}