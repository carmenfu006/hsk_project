if (user == null) window.location.href = 'candidate-login.html';

$('#apply-menu-btn').addClass('active');

$('.toggle').click(function(){
  $('.month').toggleClass("justify-content-end");
  $('.toggle').toggleClass("text-light");
});

progressIndicator()
loadFile()
activeClick('.month-item');
checkboxSelect('.exam-datetime', true, '#exam-datetime');
checkboxSelect('.sex', true, '#sex');
checkboxSelect('.hsk', true, '#hsk');
checkboxSelect('.hskk', true, '#hskk');

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
        <div class='col progress-indicator-word step-1'>选择考期</div>
        <div class='col progress-indicator-word step-2'>考生资料</div>
        <div class='col progress-indicator-word step-3'>上传照片</div>
        <div class='col progress-indicator-word step-4'>确认考生信息</div>
        <div class='col progress-indicator-word step-5'>预报名已提交</div>
      </div>
    </div>`;

  if (progressbar) progressbar.appendChild(progressbar_template.content);

  switch(page) {
    case 'application.html':
      activeProgressBar('.step-1');
      enabledNextBtn();
      break;
    case 'application-candidate-info.html':
      activeProgressBar('.step-1, .step-2');
      enabledNextBtn();
      break;
    case 'application-candidate-profile.html':
      activeProgressBar('.step-1, .step-2, .step-3');
      enabledNextBtn();
      break;
    case 'application-verify-info.html':
      activeProgressBar('.step-1, .step-2, .step-3, .step-4');
      break;
    case 'application-submit.html':
      activeProgressBar('.step-1, .step-2, .step-3, .step-4, .step-5');
      break;
      case 'payment.html':
        enabledNextBtn();
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

    if (verifyInput('#sex') && verifyInput('#hsk') && verifyInput('#hskk') && verifyInput('#username') && verifyInput('#surname') && verifyInput('#given-name') && verifyInput('#year') && verifyInput('#month') && verifyInput('#day') && verifyInput('#nationality') && verifyInput('#native-language') && verifyInput('#identity-type') && verifyInput('#identity') && verifyInput('#country-code') && verifyInput('#contact-number')) {
      $('#to-step-3').attr('disabled', false);
    } else {
      $('#to-step-3').attr('disabled', true);
    }

    if (verifyInput('#file')) {
      $('#to-step-4').attr('disabled', false);
    } else {
      $('#to-step-4').attr('disabled', true);
    }

    if (verifyInput('#discount-code')) {
      $('#verify-code').attr('disabled', false);
    } else {
      $('#verify-code').attr('disabled', true);
    }
  })
}

function loadFile() {
  let imageTag = $('#output');

  checkFile(imageTag)

  $('#file').change(function(event) {
    imageTag.attr('src', URL.createObjectURL(event.target.files[0]));
    checkFile(imageTag)
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
  sessionStorage.getItem(key);
}

function activeClick(classname) {
  $(classname).on('click', function() {
    $(classname).removeClass('active');
    $(this).addClass('active');
  });
}

function checkboxSelect(classname, setInputVal, inputId) {
  $(classname).on('change', function() {
    $(classname).prop('checked', false);
    $(this).prop('checked', true);

    if (setInputVal) {
      $(inputId).val($(this).val())
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