// Redirect user to candidate login page when not logged-in.
if (user == null) window.location.href = 'candidate-login.html';

// To indicate selected page.
$('#apply-menu-btn').addClass('active');

// To scroll months selection.
$('.toggle').click(function(){
  $('.month').toggleClass("justify-content-end");
  $('.toggle').toggleClass("text-light");
});

progressIndicator()
setupApplication()

// Check If user exists in local storage. If yes, execute storing options to local storage.
if (getLocal('user') && getLocal('user') !== '') {
  storeOptionsToLocal()
}

// To indicate progress bar for application.
function progressIndicator() {
  const progressbar = document.getElementById('progressbar');
  const progressbar_template = document.createElement('template');
  
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
      <div class='row progress-indicator-word-bar text-center'>
        <div class='col i18n-66 progress-indicator-word step-1'>选择考期</div>
        <div class='col i18n-83 progress-indicator-word step-2'>考生资料</div>
        <div class='col i18n-110 progress-indicator-word step-3'>上传照片</div>
        <div class='col i18n-123 progress-indicator-word step-4'>考生信息确认</div>
        <div class='col i18n-124 progress-indicator-word step-5'>预报名已提交</div>
      </div>
    </div>`;

  if (progressbar) progressbar.appendChild(progressbar_template.content);
}

// Execute functions according to different application stage.
// If user tries to access further stages, all session will be cleared and redirect user to stage 1.
function setupApplication() {
  const page = document.URL.split(/[?#]/)[0].split('/').pop();

  switch(page) {
    case 'application.html':
      activeProgressBar('.step-1');
      $('.display-loading').show();
      $('.display-month-year-datetime').hide();
      // Default load of exam datetime.
      if (getSession('exam-location') == null && getSession('exam-level') == null) {
        loadExamTime(1, 7);
      } else {
        loadExamTime(getSession('exam-location'), getSession('exam-level'));
      }
      selectLoadExamTime();
      if (getSession('stage1') == 'false') setSession('stage1', true);
      break;
    case 'application-candidate-info.html':
      if (getSession('stage1') == 'true') {
        activeProgressBar('.step-1, .step-2');
        checkboxSelect('.hsk', true, '#hsk', '#hsk-date');
        checkboxSelect('.hskk', true, '#hskk', '#hskk-date');
        enabledNextBtn();
        // To have datepicker on targeted element. Set locale for datepicker, refer line 1733 in bootstrap-datepicker.js
        $('#birthday, #hskdate, #hskkdate').datepicker({language: `${getLocalLang('lang')}`});
        populateEthnicity('#ethnicity')
        populateNativeLang('#native-language')
        populateNationality('#nationality')
        populateRegisterInfo()
        displayEthnicity()
      } else {
        window.location.href = window.location.origin + '/application.html'
        clearInfoSession()
      }
      break;
    case 'application-candidate-profile.html':
      if (getSession('stage2') == 'true') {
        activeProgressBar('.step-1, .step-2, .step-3');
        dragDropFile();
        loadFile();
      } else {
        window.location.href = window.location.origin + '/application.html'
        clearInfoSession()
      }
      break;
    case 'application-verify-info.html':
      if (getSession('stage3') == 'true') {
        activeProgressBar('.step-1, .step-2, .step-3, .step-4');
        populateInfo();
      } else {
        window.location.href = window.location.origin + '/application.html'
        clearInfoSession()
      }
      break;
    case 'application-submit.html':
      if (getSession('stage4') == 'true') {
        activeProgressBar('.step-1, .step-2, .step-3, .step-4, .step-5');
        setPaymentIntent()
      } else {
        window.location.href = window.location.origin + '/application.html'
        clearInfoSession()
      }
      break;
    default:
      activeProgressBar('.step-1');
      clearInfoSession()
  }
}

// To indicate progress bar by classname.
function activeProgressBar(classname) {
  $(classname).addClass('active');
}

// To enabled next button for each application stage.
function enabledNextBtn() {
  const page = document.URL.split(/[?#]/)[0].split('/').pop();
  $(':input').on('change click keyup', function() {
    if (page == 'application.html') nextBtnStage1()
    if (page == 'application-candidate-info.html') nextBtnStage2()
    if (page == 'application-candidate-profile.html') nextBtnStage3()
  })
}

// To enabled next button for application stage 1.
function nextBtnStage1() {
  if (verifyInput('#exam-datetime-id') && verifyInput('#exam-datetime') && verifyInput('#exam-amount') && verifyCheckInput('#terms')) {
    $('#to-step-2').attr('disabled', false);
  } else {
    $('#to-step-2').attr('disabled', true);
  }
}

// To enabled next button for application stage 2.
function nextBtnStage2() {
  // Hide error message if condition fulfilled.
  if (verifyInput('#firstname')) hideErrorMsg('#firstname');
  if (verifyInput('#firstname')) hideErrorMsg('#firstname');
  if (verifyInput('#lastname')) hideErrorMsg('#lastname');
  if (verifyInput('#birthday')) hideErrorMsg('#birthday');
  if (verifyInput('#nationality')) hideErrorMsg('#nationality');
  if (verifyInputByNationality('#nationality', '#ethnicity')) hideErrorMsg('#ethnicity');
  if (verifyInput('#native-language')) hideErrorMsg('#native-language');
  if (verifyInput('#certificate-type')) hideErrorMsg('#certificate-type');
  if (verifyInput('#certificate-number')) hideErrorMsg('#certificate-number');
  if (verifyInput('#phone') && verifyInputLength('#phone', 7)) {
    hideErrorMsg('#phone');
    validInput('#phone-zone');
  } 
  if (verifyInput('#study-year')) hideErrorMsg('#study-year');
  if (verifyInput('#hsk')) hideErrorMsg('#hsk');
  if (verifyInput('#hskk')) hideErrorMsg('#hskk');
  if (verifyInputByCondition('#hsk', '#hskdate')) hideErrorMsg('#hskdate');
  if (verifyInputByCondition('#hskk', '#hskkdate')) hideErrorMsg('#hskkdate');

  // Check if every field is filled.
  if (verifyInput('#gender') && verifyInput('#hsk') && verifyInput('#hskk') && verifyInput('#username') && verifyInput('#firstname') && verifyInput('#lastname') && verifyInput('#birthday') && verifyInput('#nationality') && verifyInput('#native-language') && verifyInput('#certificate-type') && verifyInput('#certificate-number') && verifyInput('#phone-zone') && verifyInput('#phone') && verifyInputLength('#phone', 7) && verifyInput('#study-year') && verifyInputByNationality('#nationality', '#ethnicity') && verifyInputByCondition('#hsk', '#hskdate') && verifyInputByCondition('#hskk', '#hskkdate')) {
    $('#input-fields').val('true');
  } else {
    $('#input-fields').val('false');
  }
}

// To prompt error message for input fields on application stage 2.
function nextBtnStage2FieldMsg() {
  // Show error message if condition not fulfilled.
  if (!verifyInput('#firstname')) {
    showErrorMsg('#firstname');
  } else if (!verifyInput('#lastname')) {
    showErrorMsg('#lastname');
  } else if (!verifyInput('#birthday')) {
    showErrorMsg('#birthday');
  } else if (!verifyInput('#nationality')) {
    showErrorMsg('#nationality');
  } else if (!verifyInputByNationality('#nationality', '#ethnicity')) {
    showErrorMsg('#ethnicity');
  } else if (!verifyInput('#native-language')) {
    showErrorMsg('#native-language');
  } else if (!verifyInput('#certificate-type')) {
    showErrorMsg('#certificate-type');
  } else if (!verifyInput('#certificate-number')) {
    showErrorMsg('#certificate-number');
  } else if (!verifyInput('#phone') || !verifyInputLength('#phone', 7)) {
    showErrorMsg('#phone');
    invalidInput('#phone-zone');
  } else if (!verifyInput('#study-year')) {
    showErrorMsg('#study-year');
  } else if (!verifyInput('#hsk')) {
    showErrorMsg('#hsk');
  } else if (!verifyInput('#hskk')) {
    showErrorMsg('#hskk');
  } else if (!verifyInputByCondition('#hsk', '#hskdate')) {
    showErrorMsg('#hskdate');
  } else if (!verifyInputByCondition('#hskk', '#hskkdate')) {
    showErrorMsg('#hskkdate');
  }
}

// To enabled next button for application stage 3.
function nextBtnStage3(infoPhoto) {
  if (getSession('file')) {
    $('#to-step-4').attr('disabled', false);
  } else if (infoPhoto) {
    $('#to-step-4').attr('disabled', false);
  } else {
    if (verifyInput('#file')) {
      $('#to-step-4').attr('disabled', false);
    } else {
      $('#to-step-4').attr('disabled', true);
    }
  }
}

// To allow drag and drop file upload then display.
function dragDropFile() {
  let dropArea = document.getElementById('drop-area')
  dropArea.addEventListener(
    "dragenter",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    false
  );
  dropArea.addEventListener(
    "dragleave",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    false
  );
  dropArea.addEventListener(
    "dragover",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    false
  );

  dropArea.addEventListener(
    "drop",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      let draggedData = e.dataTransfer;
      let file = draggedData.files[0];
      let imageTag = $('#output');
      const maxBytes = 5000000;

      if (file) {
        if (file.size <= maxBytes) {
          let reader = new FileReader();
          reader.onload = function(event){
            imageTag.attr('src', URL.createObjectURL(file));
            checkFile(imageTag)
            compressUploadedImage(event)
            $('#to-step-4').attr('disabled', false);
          }
          reader.readAsDataURL(file);
        } else {
          imageTag.attr('src', '')
          $('#file').val('');
          $('#to-step-4').attr('disabled', true);
          $('.toast').toast('show');
        }
      }
    },
    false
  );
}

// To allow file upload then display.
// If there is existing profile avatar then display.
async function loadFile() {
  let imageTag = $('#output');

  if (getSession('file')) {
    imageTag.attr('src', getSession('file'));
    $('#to-step-4').attr('disabled', false);
    checkFile(imageTag)
  } else {
    let infoPhoto = await populateProfile();
    imageTag.attr('src', infoPhoto);
    checkFile(imageTag)
    $('#to-step-4').attr('disabled', false);
  }

  checkFile(imageTag)

  // To allow file upload then display.
  $('#file').change(function() {
    const file = this.files[0];
    const maxBytes = 5000000;
    if (file) {
      if (file.size <= maxBytes) {
        let reader = new FileReader();
        
        reader.onload = function(event){
          imageTag.attr('src', URL.createObjectURL(file));
          checkFile(imageTag)
          compressUploadedImage(event)
          nextBtnStage3()
        }
        reader.readAsDataURL(file);
      } else {
        imageTag.attr('src', '')
        $('#file').val('');
        $('#to-step-4').attr('disabled', true);
        $('.toast').toast('show');
      }
    }
  });

  // To allow delete of uploaded image.
  $('.fa-trash').click(function() {
    imageTag.attr('src', '')
    $('#file').val('');
    $('#to-step-4').attr('disabled', true);
    sessionStorage.removeItem('file');
    checkFile(imageTag)
  })

  if (imageTag[0].naturalWidth == 0) {
    $('.fa-trash').click();
  }
}

// To display uploaded image if it exists.
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

// To compress uploaded image for storing it in session.
function compressUploadedImage(event) {
  var image = new Image();
  image.onload = function(imageEvent) {
    var max_size = 300;
    var w = image.width;
    var h = image.height;
    
    if (w > h) {  if (w > max_size) { h*=max_size/w; w=max_size; }
    } else     {  if (h > max_size) { w*=max_size/h; h=max_size; } }
    
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(image, 0, 0, w, h);
    
    var dataURL = canvas.toDataURL('image/jpeg', 1.0);

    setSession('file', dataURL);
  }
  image.src = event.target.result;
}

// To set session.
function setSession(key, value) {
  sessionStorage.setItem(key, value);
}

// To get session storage value.
function getSession(key) {
  return sessionStorage.getItem(key);
}

// To get local storage value.
function getLocal(key) {
  return localStorage.getItem(key);
}

// To add active class to element.
function activeClick(classname) {
  $(classname).on('click', function() {
    $(classname).removeClass('active');
    $(this).addClass('active');
  });
}

// To update hidden input value based on checked checkbox.
function checkboxSelect(classname, setInputVal, inputId, targetId, targetId2, targetElem, targetDisplay) {
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

      if ($(this).data('id')) {
        $(targetId2).val($(this).data('id'));
      }

      if ($(this).data('currency')) {
        $(targetElem).val($(this).data('currency').toUpperCase());
        $(targetDisplay).html($(targetElem).val());
      }

      if ($(inputId).val() === 'yes') {
        $(targetId).removeClass('d-none');
      } else {
        $(targetId).addClass('d-none');
      }
    }
    
  });
}

// Show error message for input field
function showErrorMsg(id) {
  let position = document.getElementById(id.split('#')[1]).offsetTop;
  invalidInput(id)
  $(`${id}-error`).removeClass('d-none');
  
  if (position > 0) {
    window.scrollTo({top: position, behavior: 'smooth'});
  }
}

// Hide error message for input field
function hideErrorMsg(id) {
  validInput(id)
  $(`${id}-error`).addClass('d-none');
}

// To have red warning for input field.
function invalidInput(id) {
  $(id).addClass('invalid');
}

// To remove red warning from input field.
function validInput(id) {
  $(id).removeClass('invalid');
}

// Verify existance of input value. 
function verifyInput(id) {
  if ($(id).val() === '') {
    return false;
  } else {
    return true;
  }
}

// Verify length of input value. 
function verifyInputLength(id, minLength) {
  if ($(id).val().length < minLength) {
    return false;
  } else {
    return true;
  }
}

// Verify existance of input value based on condition. 
function verifyInputByCondition(id, targetDate) {
  if ($(id).val() == 'yes') {
    if ($(targetDate).val() == '') {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

// Verify input value to determine another input field to be filled. 
function verifyInputByNationality(id, targetElem) {
  if ($(id).val().match('中国')) {
    if ($(targetElem).val() == '') {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

// Verify if input is checked.
function verifyCheckInput(id) {
  return $(id).is(':checked')
}

// To get input value.
function inputVal(id) {
  return $(id).val()
}

// Eventlistener for application stage 1 next button.
$('#to-step-2').on('click', function(e) {
  e.preventDefault();
  setSession('exam-location', inputVal('#exam-location'));
  setSession('exam-level', inputVal('#exam-level'));
  setSession('exam-datetime-id', inputVal('#exam-datetime-id'));
  setSession('exam-datetime', inputVal('#exam-datetime'));
  setSession('exam-amount', inputVal('#exam-amount'));
  setSession('exam-currency', inputVal('#exam-currency'));
  setSession('exam-yearmonth', inputVal('#exam-yearmonth'));
  setSession('terms', inputVal('#terms'));
  setSession('stage1', true);

  window.location.replace($(this)[0].form.action);
});

// Eventlistener for application stage 2 next button.
$('#to-step-3').on('click', function(e) {
  e.preventDefault();
  setSession('gender', inputVal('#gender'));
  setSession('hsk', inputVal('#hsk'));
  setSession('hskk', inputVal('#hskk'));
  setSession('username', inputVal('#username'));
  setSession('firstname', inputVal('#firstname'));
  setSession('lastname', inputVal('#lastname'));
  setSession('birthday', inputVal('#birthday'));
  setSession('nationality', inputVal('#nationality'));
  setSession('ethnicity', inputVal('#ethnicity'));
  setSession('native-language', inputVal('#native-language'));
  setSession('certificate-type', inputVal('#certificate-type'));
  setSession('certificate-number', inputVal('#certificate-number'));
  setSession('phone-zone', inputVal('#phone-zone'));
  setSession('phone', inputVal('#phone'));
  setSession('study-year', inputVal('#study-year'));

  if (inputVal('#hsk') == 'yes') {
    setSession('hskdate', inputVal('#hskdate'));
  }
  if (inputVal('#hskk') == 'yes') {
    setSession('hskkdate', inputVal('#hskkdate'));
  }

  if (inputVal('#input-fields') == 'true') {
    setSession('stage2', true);
    window.location.replace($(this)[0].form.action);
  } else {
    let lang = getLocalLang('lang');
    $('.toast-text').html(transLang(lang, '请填写所有字段。', 'Please have all the fields filled.', 'Harap isi semua kolom.', 'يرجى ملء كافة الحقول.'));
    nextBtnStage2FieldMsg();
    $('.toast').toast('show');
  }
});

// Eventlistener for application stage 3 next button.
$('#to-step-4').on('click', function(e) {
  e.preventDefault();
  setSession('stage3', true);
  window.location.replace($(this)[0].form.action);
});

// Eventlistener for application submit button.
// Submit application via API.
$('#submit-application').on('click', async(e) => {
  $('#submit-application').attr('disabled', true);
  // Get avatar url.
  let photo_url = await populateProfile();
  // If new avatar exists get base64 of the uploaded image else existing avatar url.
  let image_file = getSession('file') ? getSession('file').split(',')[1] : photo_url

  let sessionData = {
      schedule_id: getSession('exam-datetime-id'),
      name_en: getSession('firstname'),
      name_cn: getSession('lastname'),
      gender: getSession('gender'),
      birthday: getSession('birthday'),
      nationality: getSession('nationality'),
      native_language: getSession('native-language'),
      certificate_type: getSession('certificate-type'),
      certificate_number: getSession('certificate-number'),
      phone_zone: getSession('phone-zone'),
      phone: getSession('phone'),
      study_year: getSession('study-year'),
      have_hsk: getSession('hsk') == 'yes' ? true : false,
      have_hskk: getSession('hskk') == 'yes' ? true : false,
      file64: image_file,
      file64_ext: 'jpg'
  }

  // Only include params when exists.
  if (getSession('ethnicity') == '' && getSession('hsk') == 'yes' && getSession('hskk') == 'no') {
    sessionData['have_hsk_date'] = getSession('hskdate')
  } else if (getSession('ethnicity') == '' && getSession('hsk') == 'no' && getSession('hskk') == 'yes') {
    sessionData['have_hskk_date'] = getSession('hskkdate')
  } else if (getSession('ethnicity') != '' && getSession('hsk') == 'no' && getSession('hskk') == 'no') {
    sessionData['ethnicity'] = getSession('ethnicity')
  } else if (getSession('ethnicity') != '' && getSession('hsk') == 'yes' && getSession('hskk') == 'no') {
    sessionData['ethnicity'] = getSession('ethnicity')
    sessionData['have_hsk_date'] = getSession('hskdate')
  } else if (getSession('ethnicity') != '' && getSession('hsk') == 'no' && getSession('hskk') == 'yes') {
    sessionData['ethnicity'] = getSession('ethnicity')
    sessionData['have_hskk_date'] = getSession('hskkdate')
  } else if (getSession('ethnicity') == '' && getSession('hsk') == 'yes' && getSession('hskk') == 'yes') {
    sessionData['have_hsk_date'] = getSession('hskdate')
    sessionData['have_hskk_date'] = getSession('hskkdate')
  } else if (getSession('ethnicity') != '' && getSession('hsk') == 'yes' && getSession('hskk') == 'yes') {
    sessionData['ethnicity'] = getSession('ethnicity')
    sessionData['have_hsk_date'] = getSession('hskdate')
    sessionData['have_hskk_date'] = getSession('hskkdate')
  }

  // Post API to submit application.
  let response = await fetch('https://api.hskk.org/webapi/register_exam_info/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${user}`
    },
      body: JSON.stringify(sessionData)
  })
  let data = await response.json();
  let info = data.data

  if (data.code == 200) {
    clearInfoSession();
    setSession('stage4', true);
    window.location.href = window.location.origin + `/application-submit.html?payment=${info.payment_client_secret}`
  } else {
    $('#submit-application').attr('disabled', false);
    $('.toast').toast('show');
  }
});

// To populate info for verification on application-verify-info.html
async function populateInfo() {
  let lang = getLocalLang('lang');
  let infoPhoto = await populateProfile();
  let nationality_options = JSON.parse(getLocal('nationality_options'));
  let ethnicity_options = JSON.parse(getLocal('ethnicity_options'));
  let native_language_options = JSON.parse(getLocal('native_language_options'));
  let nationality;
  let ethnicity;
  let native_language;
  if (getSession('file')) {
    $('#verify-profile').attr('src', getSession('file'));
  } else {
    $('#verify-profile').attr('src', infoPhoto);
  }
  if (getSession('nationality').match('中国')) {
    ethnicity = ethnicity_options.filter(function(option) {
      return option.ethnicity == getSession('ethnicity');
    });
    ethnicity = ethnicity[0].ethnicity;
    $('.ethnicity-info').show()
  } else {
    $('.ethnicity-info').hide()
  }

  nationality = nationality_options.filter(function(option) {
    return option.nationality == getSession('nationality');
  });

  native_language = native_language_options.filter(function(option) {
    return option.native_language == getSession('native-language');
  });

  if (lang == 'zh-hans' || lang == 'zh-hant') {
    nationality = nationality[0].nationality;
    native_language = native_language[0].native_language;
  } else {
    nationality = nationality[0].nationality_en;
    native_language = native_language[0].native_language_en;
  }

  if ($('.info-gender')) $('.info-gender').html(valueGender(lang, getSession('gender')));
  if ($('.info-nationality')) $('.info-nationality').html(nationality);
  if ($('.info-ethnicity')) $('.info-ethnicity').html(ethnicity);
  if ($('.info-native-language')) $('.info-native-language').html(native_language);
  if ($('.info-certificate-type')) $('.info-certificate-type').html(valueCertificateType(lang, getSession('certificate-type')));
  if ($('.info-study-year')) $('.info-study-year').html(valueStudyYear(lang, getSession('study-year')));

  if ($('.info-username')) $('.info-username').html(getSession('username'));
  if ($('.info-fistname')) $('.info-fistname').html(getSession('firstname'));
  if ($('.info-lastname')) $('.info-lastname').html(getSession('lastname'));
  if ($('.info-birthday')) $('.info-birthday').html(getSession('birthday'));
  if ($('.info-certificate-number')) $('.info-certificate-number').html(getSession('certificate-number'));
  if ($('.info-contact-number')) $('.info-contact-number').html(getSession('phone-zone') + '-' + getSession('phone'));
  if ($('.info-hsk')) $('.info-hsk').html(valueYesNo(lang, getSession('hsk')));
  if ($('.info-hskk')) $('.info-hskk').html(valueYesNo(lang, getSession('hskk')));
}

// To translate based on yes/no value.
function valueYesNo(lang, value) {
  if (value == 'yes') {
    return transLang(lang, '有', 'Yes', 'Ya', 'نعم')
  } else {
    return transLang(lang, '没有', 'No', 'Tidak', 'لا')
  }
}

// To translate based on male/female value.
function valueGender(lang, value) {
  if (value == '0') {
    return transLang(lang, '女', 'Female', 'Perempuan', 'أنثى')
  } else {
    return transLang(lang, '男', 'Male', 'Laki-laki', 'ذكر')
  }
}

// To translate based on certificate type.
function valueCertificateType(lang, value) {
  switch(value) {
    case '1':
      return transLang(lang, '身份证', 'ID card', 'KTP', 'بطاقة التعريف')
      break;
    case '2':
      return transLang(lang, '护照', 'Passport', 'Paspor', 'جواز سفر')
      break;
    case '3':
      return transLang(lang, '居留证', 'Resident permit', 'Izin tinggal', 'تصريح المقيمين')
      break;
    case '4':
      return transLang(lang, '其他', 'Other', 'Lainnya', 'آخر')
      break;
    default:
      return transLang(lang, '身份证', 'ID card', 'KTP', 'بطاقة التعريف')
  }
}

// To translate based on study year.
function valueStudyYear(lang, value) {
  switch(value) {
    case '1':
      return transLang(lang, '半年', 'Half a year', 'Setengah tahun', 'نصف عام')
      break;
    case '2':
      return transLang(lang, '6-12个月', '6-12 months', '6-12 bulan', '6-12 شهرا')
      break;
    case '3':
      return transLang(lang, '1年', '1 year', '1 tahun', '1 سنة')
      break;
    case '4':
      return transLang(lang, '2年', '2 year', '2 tahun', '2 سنة')
      break;
    case '5':
      return transLang(lang, '3年', '3 year', '3 tahun', '3 سنة')
      break;
    case '6':
      return transLang(lang, '4年', '4 year', '4 tahun', '4 سنة')
      break;
    case '7':
      return transLang(lang, '5年', '5 year', '5 tahun', '5 سنة')
      break;
    case '8':
      return transLang(lang, '5-10年', '5-10 year', '5-10 tahun', '5-10 سنة')
      break;
    case '9':
      return transLang(lang, '10年以上', 'More than 10 years', 'Lebih dari 10 tahun', 'أكثر من 10 سنوات')
      break;
    default:
      return transLang(lang, '半年', 'Half a year', 'Setengah tahun', 'نصف عام')
  }
}

// To display language accordingly.
function transLang(lang, zh_hans, en, id, ar) {
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
      return zh_hans
  }
}

// To load exam datetime when location and exam level changes.
// To have hidden input fields cleared.
function selectLoadExamTime() {
  $('#exam-location, #exam-level').on('change', async() => {
    $('.display-loading').show();
    $('.display-month-year-datetime').hide();
    $('#exam-datetime-selection').empty();
    $('#exam-datetime-options').empty();
    $('#exam-datetime').val('');
    $('#exam-amount').val('');
    $('#exam-currency').val('');
    $('.exam-datetime').prop('checked', false);
    nextBtnStage1()
    await loadExamTime($('#exam-location').val(), $('#exam-level').val())
    updateCartItem()
  })
}

// To load exam datetime according to location and exam level via API.
async function loadExamTime(area, level) {
  let lang = getLocalLang('lang');
  let month_options = [];
  let year_options = [];
  let response = await fetch(`https://api.hskk.org/webapi/test_schedule?test_area=${area}&test_level=${level}`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json'
      }
    })
  let data = await response.json();
  let exam_time_options = data.data[0];

  if (exam_time_options) {
    // To get available years and months.
    exam_time_options.forEach(function(item) {
      let event = new Date(item.test_timestamp * 1000);
      let event_month_value = event.toLocaleString(convertLang('en'), {'month' : '2-digit'})
      let event_month = event.toLocaleString(convertLang(lang), {'month' : 'short'})
      let event_year = event.getFullYear()

      let newMonthObject = {'year' : event_year, 'month' : event_month, 'value' : event_month_value, 'year_month' : event_year + '-' + event_month_value}
      month_options.push(newMonthObject)
      year_options.push(event_year)
    });

    // To filter out duplicated months and years
    let unique_year = [...new Set(year_options)]
    let unique_year_month = month_options.filter((obj, index) => {
      return index === month_options.findIndex(o => obj.year_month === o.year_month);
    });

    // To clear element before append
    $('#exam-datetime-selection').empty();
    $('#exam-datetime-options').empty();
    
    // Populate available years.
    unique_year.forEach(function(item) {
      const exam_datetime_selection = $('#exam-datetime-selection')[0];
      const exam_year_template = document.createElement('template');
      exam_year_template.innerHTML = `
        <div id=${item} class='month-year mr-1 ml-1'>${item}</div>
      `;
      exam_datetime_selection.appendChild(exam_year_template.content);
    });

    // Populate available months.
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

    $('.display-loading').hide();
    $('.display-month-year-datetime').show();
  } else {
    unavailableExamDateTimeOptions()
  }

  // To select the first month displayed if available and load exam datetime accordingly.
  if ($('.month-item:first')) {
    $('.month-item:first').addClass('active');
      let default_year_month = $('.month-item:first').data('year-month');
      $('#exam-yearmonth').val(default_year_month);
      if (exam_time_options) loadSelectedExamTime(default_year_month, JSON.stringify(exam_time_options))
  }

  // Eventlistener on selected month to show exam datetime.
  // To have hidden input fields cleared.
  $('.month-item').on('click', function() {
    $('#exam-yearmonth').val($(this).data('year-month'));
    $('#exam-datetime-id').val('');
    $('#exam-datetime').val('');
    $('#exam-amount').val('');
    $('.exam-datetime').prop('checked', false);
    nextBtnStage1()
    let year_month = $(this).data('year-month');
    $('#exam-datetime-options').empty();
    if (exam_time_options) loadSelectedExamTime(year_month, JSON.stringify(exam_time_options))
    checkboxSelect('.exam-datetime', true, '#exam-datetime', '#exam-amount', '#exam-datetime-id', '#exam-currency', '.currency-display');
    $('.exam-datetime').on('change', function() {
      updateCartItem()
      nextBtnStage1()
    });
    updateCartItem()
  })

  activeClick('.month-item');
  checkboxSelect('.exam-datetime', true, '#exam-datetime', '#exam-amount', '#exam-datetime-id', '#exam-currency', '.currency-display');
  enabledNextBtn();

  $('.exam-datetime').on('change', function() {
    updateCartItem()
  });

  if ($('#exam-currency').val() == '') $('.currency-display').html(getSession('exam-currency'));

  // If user already been through application stage 1 then load session data.
  if (getSession('stage1') == 'true') loadSessionData1();
}

// To load exam datetime and append element based on selected month.
function loadSelectedExamTime(year_month, exam_time_options) {
  JSON.parse(exam_time_options).forEach(function(item, i) {
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
                <input class='form-check-input exam-datetime' type='checkbox' name='checkbox${i}' id='checkbox${i}' value='${item.test_date_time}' data-price='${item.price}' data-currency='${item.currency_display}' data-id='${item.id}'>
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

// To display selected location, exam level and exam datetime in cart.
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

// To display based on preferred language.
function selectedDateTimeLocationLevelLang(targetId, zh_hans, en, id, ar) {
  let lang = getLocalLang('lang');
  switch(lang) {
    case 'zh-hans':
      $(targetId).html(zh_hans)
      break;
    case 'zh-hant':
      $(targetId).html(zh_hans)
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
      $(targetId).html(zh_hans)
  }
}

// To update cart item each time exam datetime selection changes.
// To clear cart item each time exam location or exam level changes.
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

// To display unavailable exam datetime wording when no datetime is available via API.
function unavailableExamDateTimeOptions() {
  let lang = getLocalLang('lang');
  const exam_datetime_options = $('#exam-datetime-options')[0];
  let exam_date_template = document.createElement('template');
  let no_data_lang
  if (lang == 'zh-hans' || lang == 'zh-hant') no_data_lang = '暂时无法提供考试时间';
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

// To get language value from local storage. Default value is 'zh-hans'.
function getLocalLang(key) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : 'zh-hans';
}

// Return preferred language for showing timestamp.
function convertLang(lang) {
  switch(lang) {
    case 'zh-hans':
      return 'zh-HK'
      break;
    case 'zh-hant':
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

// To fill value for input field.
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

// To load session data for application stage 1.
function loadSessionData1() {
  if (getSession('exam-location')) refillField('input', '#exam-location', getSession('exam-location'));
  if (getSession('exam-level')) refillField('input', '#exam-level', getSession('exam-level'));
  if (getSession('exam-yearmonth')) refillField('element', '.month-item', getSession('exam-yearmonth'));
  if (getSession('exam-datetime')) refillField('checkbox', '#exam-datetime', getSession('exam-datetime'));
  if (getSession('exam-datetime-id')) refillField('input', '#exam-datetime-id', getSession('exam-datetime-id'));
  if (getSession('exam-datetime')) refillField('input', '#exam-datetime', getSession('exam-datetime'));
  if (getSession('exam-amount')) refillField('input', '#exam-amount', getSession('exam-amount'));
  if (getSession('terms')) refillField('checkbox', '#terms', getSession('terms'));
  nextBtnStage1()
  updateCartItem()
  setSession('stage1', false);
}

// To get options from API.
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

// To populate nationality options.
function populateNationality(id) {
  let lang = getLocalLang('lang');
  let options = JSON.parse(getLocal('nationality_options'));

  if (options) {
    for (let i = 0; i <= options.length; i++) {
      let option = document.createElement('option');
      option.value = options[i]?.nationality;
      if (lang == 'zh-hans' || lang == 'zh-hant') {
        option.text = options[i]?.nationality;
      } else {
        option.text = options[i]?.nationality_en;
      }
      $(id)[0].appendChild(option)
    }
    $(id)[0].remove($(id)[0].length-1);
  }
}

// To populate ethnicity options.
function populateEthnicity(id) {
  let lang = getLocalLang('lang');
  let options = JSON.parse(getLocal('ethnicity_options'));

  if (options) {
    for (let i = 0; i <= options.length; i++) {
      let option = document.createElement('option');
      option.value = options[i]?.ethnicity;
      if (lang == 'zh-hans' || lang == 'zh-hant') {
        option.text = options[i]?.ethnicity;
      } else {
        option.text = options[i]?.ethnicity;
      }
      $(id)[0].appendChild(option)
    }
    $(id)[0].remove($(id)[0].length-1);
  }
}

// To populate native language options.
function populateNativeLang(id) {
  let lang = getLocalLang('lang');
  let options = JSON.parse(getLocal('native_language_options'));
  if (options) {
    for (let i = 0; i <= options.length; i++) {
      let option = document.createElement('option');
      option.value = options[i]?.native_language;
      if (lang == 'zh-hans' || lang == 'zh-hant') {
        option.text = options[i]?.native_language;
      } else {
        option.text = options[i]?.native_language_en;
      }
      $(id)[0].appendChild(option)
    }
    $(id)[0].remove($(id)[0].length-1);
  }
}

// Store options to local storage.
async function storeOptionsToLocal() {
  if (!getLocal('nationality_options')) {
    let nationality_options = await populateOptions('https://api.hskk.org/webapi/nationality/');
    localStorage.setItem('nationality_options', JSON.stringify(nationality_options));
  }
  if (!getLocal('ethnicity_options')) {
    let ethnicity_options = await populateOptions('https://api.hskk.org/webapi/ethnicity/');
    localStorage.setItem('ethnicity_options', JSON.stringify(ethnicity_options));
  } 
  if (!getLocal('native_language_options')) {
    let native_language_options = await populateOptions('https://api.hskk.org/webapi/native_language/');
    localStorage.setItem('native_language_options', JSON.stringify(native_language_options));
  }
}

// Display ethnicity field when nationality field selection value contains '中国'.
function displayEthnicity() {
  $('#ethnicity-selection').hide()
  $('#nationality').on('change', function() {
    let selected = $(this).val();
    if (selected.match('中国')) {
      $('#ethnicity-selection').show()
    } else {
      $('#ethnicity-selection').hide()
      $('#ethnicity').val('')
      setSession('ethnicity', '')
    }
  })
}

// Display ethnicity value when nationality value contains '中国'.
function checkEthnicity() {
  if ($('#nationality').val().match('中国')) {
    $('#ethnicity-selection').show()
  } else {
    $('#ethnicity-selection').hide()
    $('#ethnicity').val('')
    setSession('ethnicity', '')
  }
}

// Populate existing user info if exists via API.
async function populateRegisterInfo() {
  let response = await fetch('https://api.hskk.org/webapi/register_default_info/', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${user}`
      }
    })
  let data = await response.json();
  let info = data.data;
  
  if (getSession('stage2') == 'true') {
    if (getSession('username')) refillField('input', '#username', getSession('username'));
    if (getSession('firstname')) refillField('input', '#firstname', getSession('firstname'));
    if (getSession('lastname')) refillField('input', '#lastname', getSession('lastname'));
    if (getSession('gender')) refillField('input', '#gender', getSession('gender'));
    if (getSession('birthday')) refillField('input', '#birthday', getSession('birthday'));
    if (getSession('nationality')) refillField('input', '#nationality', getSession('nationality'));
    if (getSession('ethnicity')) refillField('input', '#ethnicity', getSession('ethnicity'));
    if (getSession('native-language')) refillField('input', '#native-language', getSession('native-language'));
    if (getSession('certificate-type')) refillField('input', '#certificate-type', getSession('certificate-type'));
    if (getSession('certificate-number')) refillField('input', '#certificate-number', getSession('certificate-number'));
    if (getSession('phone-zone')) refillField('input', '#phone-zone', getSession('phone-zone'));
    if (getSession('phone')) refillField('input', '#phone', getSession('phone'));
    if (getSession('study-year')) refillField('input', '#study-year', getSession('study-year'));
    if (getSession('hsk')) refillField('input', '#hsk', getSession('hsk'));
    if (getSession('hskk')) refillField('input', '#hskk', getSession('hskk'));

    if (getSession('hsk') == 'yes') {
      $('#yes_hsk').prop('checked', true)
      $('#hsk-date').removeClass('d-none');
      if (getSession('hskdate')) refillField('input', '#hskdate', getSession('hskdate'));
    } else {
      $('#no_hsk').prop('checked', true)
    }

    if (getSession('hskk') == 'yes') {
      $('#yes_hskk').prop('checked', true)
      $('#hskk-date').removeClass('d-none');
      if (getSession('hskkdate')) refillField('input', '#hskkdate', getSession('hskkdate'));
    } else {
      $('#no_hskk').prop('checked', true)
    }

    if (getSession('nationality').match('中国')) {
      $('#ethnicity-selection').show()
    } else {
      $('#ethnicity-selection').hide()
    }
    nextBtnStage2()
  } else {
    if (info.email == '') {
      if (getLocal('username')) refillField('input', '#username', getLocal('username'));
    } else {
      if (info.email) refillField('input', '#username', info.email);
      if (info.name_en) refillField('input', '#firstname', info.name_en);
      if (info.name_cn) refillField('input', '#lastname', info.name_cn);
      if (info.gender) refillField('input', '#gender', info.gender);
      if (info.birthday) refillField('input', '#birthday', info.birthday);
      if (info.nationality) {
        refillField('input', '#nationality', info.nationality);
        checkEthnicity()
      } 
      if (info.ethnicity) refillField('input', '#ethnicity', info.ethnicity);
      if (info.native_language) refillField('input', '#native-language', info.native_language);
      if (info.certificate_type) refillField('input', '#certificate-type', info.certificate_type);
      if (info.certificate_number) refillField('input', '#certificate-number', info.certificate_number);
      if (info.phone_zone) refillField('input', '#phone-zone', info.phone_zone);
      if (info.phone) refillField('input', '#phone', info.phone);
      if (info.study_year) refillField('input', '#study-year', info.study_year);
    }
  }
}

// Get user avatar via API.
async function populateProfile() {
  let response = await fetch('https://api.hskk.org/webapi/register_default_info/', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${user}`
      }
    })
  let data = await response.json();
  let info = data.data;
  let photo = info.photo_path;

  return photo
}

// Set button URL on application-submit.html to have payment_id params for the purpose of payment page.
// Display payment link for user to refer on application-submit.html
function setPaymentIntent() {
  const payment_id = new URL(location.href).searchParams.get('payment');
  const payment_link = window.location.origin + '/payment.html?payment_id=' + payment_id
  $('#payment-link').html(payment_link);
  $('#payment-link').attr('href', payment_link);
  $('#to-payment-btn').attr('href', $('#to-payment-btn').attr('href') + `?payment_id=${payment_id}`)
}
