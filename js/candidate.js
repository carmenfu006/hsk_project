// $('.toast').toast('show');

instructionProgressIndicator()
dashboardPage()

function instructionProgressIndicator() {
  const progressbar = document.getElementById('instruction-progressbar');
  const progressbar_template = document.createElement('template');
  const page = document.URL.split(/[?#]/)[0].split('/').pop();
  
  progressbar_template.innerHTML = `
  <div class='instruction-progress-indicator-width'>
    <div class='row instruction-progress-indicator-bar'>
      <div class='instruction-progress-indicator-dot step-1'>1</div>
      <div class='instruction-progress-indicator-word i18n-170 step-1'>下载移动端考试APP</div>
      <div class='instruction-progress-indicator-line step-2'></div>
      <div class='instruction-progress-indicator-dot step-2'>2</div>
      <div class='instruction-progress-indicator-word i18n-171 step-2'>考前需知</div>
      <div class='instruction-progress-indicator-line step-3'></div>
      <div class='instruction-progress-indicator-dot step-3'>3</div>
      <div class='instruction-progress-indicator-word i18n-172 step-3'>考试当天</div>
    </div>
  </div>`;

  if (progressbar) progressbar.appendChild(progressbar_template.content);

  switch(page) {
    case 'exam-instruction.html':
      activeProgressBar('.step-1');
      break;
    case 'exam-instruction-step2.html':
      activeProgressBar('.step-1, .step-2');
      break;
    case 'exam-instruction-step3.html':
      activeProgressBar('.step-1, .step-2, .step-3');
      break;
    case 'exam-instruction-complete.html':
      countdown(5)
      break;
    default:
      activeProgressBar('.step-1');
  }
}

function activeProgressBar(classname) {
  $(classname).addClass('active');
}

function countdown(second) {
  var timeleft = second;
  var timer = setInterval(function(){
    if(timeleft == 0){
      clearInterval(timer);
      window.location.href = 'dashboard.html'
    }
    $('#timer').html(timeleft);
    timeleft -= 1;
  }, 1000);
}

function dashboardPage() {
  const page = document.URL.split(/[?#]/)[0].split('/').pop();

  switch(page) {
    case 'dashboard.html':
      authoriseAccess()
      activeMenuBar('#dashboard-sidebar', '#dashboard-footbar')
      scrollFootbar('dashboard-footbar')
      break;
    case 'exam-instruction.html':
      authoriseAccess()
      break;
    case 'exam-instruction-step2.html':
      authoriseAccess()
      break;
    case 'exam-instruction-step3.html':
      authoriseAccess()
      break;
    case 'inspection-instruction.html':
      authoriseAccess()
      activeMenuBar('#inspection-sidebar', '#inspection-footbar')
      scrollFootbar('inspection-footbar')
      break;
    case 'important-notice.html':
      authoriseAccess()
      activeMenuBar('#notice-sidebar', '#notice-footbar')
      activeIndicator('.notice-indicator-dot')
      scrollFootbar('notice-footbar')
      break;
    case 'abnormal-alert.html':
      authoriseAccess()
      activeMenuBar('#alert-sidebar', '#alert-footbar')
      activeIndicator('.alert-indicator-dot')
      scrollFootbar('alert-footbar')
      break;
    case 'support-center.html':
      authoriseAccess()
      activeMenuBar('#support-sidebar', '#support-footbar')
      scrollFootbar('support-footbar')
      checkFile($('#output'))
      break;
    case 'faqs.html':
      authoriseAccess()
      activeMenuBar('#faqs-sidebar', '#faqs-footbar')
      scrollFootbar('faqs-footbar')
      break;
    case 'exam-record.html':
      authoriseAccess()
      activeMenuBar('#record-sidebar', '#record-footbar')
      activeIndicator('.status-filter')
      scrollFootbar('record-footbar')
      break;
  }
}

function activeMenuBar(sidebarId, footbarId) {
  $(sidebarId).addClass('active');
  $(footbarId).addClass('active');
}

function setSession(key, value) {
  sessionStorage.setItem(key, value);
}

function getSession(key) {
  return sessionStorage.getItem(key);
}

function activeIndicator(classname) {
  $(classname).on('click', function(event) {
    $(classname).removeClass('active');
    $(this).addClass('active')
  })
}

function scrollFootbar(id) {
  document.getElementById(id).scrollIntoView()
}

function authoriseAccess() {
  if (user == null) window.location.href = window.location.origin + '/candidate-login.html'
}

$('#file').change(function() {
  const fileTag = $('#output');
  const file = this.files[0];
  const maxBytes = 500000;

  if (file.size <= maxBytes) {
    if (file) {
      let reader = new FileReader();
      reader.onload = function(event){
        fileTag.attr('src', URL.createObjectURL(file));
        checkFile(fileTag)
        setSession('support-center-file', event.target.result);
      }
      reader.readAsDataURL(file);
    }
  } else {
    fileTag.attr('src', '')
    $('#file').val('');
    $('.toast').toast('show');
  }
});

$('.fa-trash').click(function() {
  const fileTag = $('#output');
  fileTag.attr('src', '')
  $('#file').val('');
  checkFile(fileTag)
  sessionStorage.removeItem('support-center-file');
})

function checkFile(fileTag) {
  let fileUpload = $('.file-upload');
  let fileDisplay = $('.file-display');

  if (fileTag.attr('src') == '') {
    fileUpload.removeClass('d-none');
    fileDisplay.addClass('d-none');
  } else {
    fileUpload.addClass('d-none');
    fileDisplay.removeClass('d-none');
  }
}

$('#candidate-support-center').on('click', async() => {
  let lang = getSession('lang') ? getSession('lang') : 'zh';
  let inputData;
  if (getSession('support-center-file')) {
    inputData = {
      device: $('#device').val(),
      description: $('#description').val(),
      file64: getSession('support-center-file').split(',')[1]
    }
  } else {
    inputData = {
      device: $('#device').val(),
      description: $('#description').val()
    }
  }

  if (verifyInput($('#device')) && verifyInput($('#description'))) {
    let response = await fetch('https://api.hskk.info/webapi/support_center/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Accept-Language': lang,
        'Authorization' : `Bearer ${user}`
      },
        body: JSON.stringify(inputData)
    })
    let data = await response.json();
    console.log(data)
    if (data.code == 201) {
      $('.toast-header').removeClass('bg-danger-color');
      $('.toast-text').html(transLang(lang, '信息已成功发送', 'Message sent successfully', 'Pesan berhasil terkirim', 'تم إرسال الرسالة بنجاح'));
      $('.toast-text').removeClass('danger-color');
      $('.toast').toast('show');
    } else {
      $('#toast-header').addClass('bg-danger-color');
      $('#toast-text').addClass('danger-color');
      $('#toast-text').html(data.msg)
      $('.toast').toast('show');
    }
    
  } else {
    if (verifyInput($('#device')) == false) {
      invalidInput($('#device'));
      $('.toast-text').html(transLang(lang, '请输入您使用的设备型号', 'Please enter the model of the device you are using', 'Silakan masukkan model perangkat yang Anda gunakan', 'الرجاء إدخال نموذج الجهاز الذي تستخدمه'));
      $('.toast').toast('show');
    } else if (verifyInput($('#description')) == false) {
      invalidInput($('#description'));
      $('.toast-text').html(transLang(lang, '请输入您的问题描述', 'Please enter your description', 'Silakan masukkan deskripsi Anda', 'الرجاء إدخال الوصف الخاص بك'));
      $('.toast').toast('show');
    } else {
      invalidInput($('#device'));
      invalidInput($('#description'));
      $('.toast-text').html(transLang(lang, '以上输入字段不能为空', 'Above input fields cannot be empty', 'Kolom masukan di atas tidak boleh kosong', 'لا يمكن أن تكون حقول الإدخال أعلاه فارغة'));
      $('.toast').toast('show');
    }
  }
  
});

$('#device, #description').on('keyup', function() {
  validInput('#device');
  validInput('#description');
})

function verifyInput(id) {
  if ($(id).val() === '') {
    return false;
  } else {
    return true;
  }
}

function invalidInput(id) {
  $(id).addClass('invalid');
}

function validInput(id) {
  $(id).removeClass('invalid');
}

function transLang(lang, zh, en, id, ar) {
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