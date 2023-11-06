// candidate.js applies to user dashboard pages

instructionProgressIndicator()
dashboardPage()

// For FAQs collapse and expand feature.
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

// Progress indicator for exam instruction pages.
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

// To indicate selected progress bar.
function activeProgressBar(classname) {
  $(classname).addClass('active');
}

// To countdown and direct user to user dashboard after finish exam instructions.
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

// Execute functions according to different user dashboard pages.
function dashboardPage() {
  const page = document.URL.split(/[?#]/)[0].split('/').pop();

  switch(page) {
    case 'dashboard.html':
      authoriseAccess()
      activeMenuBar('#dashboard-sidebar', '#dashboard-footbar')
      scrollFootbar('dashboard-footbar')
      personalInfo()
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
      dragDropFile()
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
      loadExamRecord()
      break;
  }
}

// To indicate selected page on sidebar and footbar.
function activeMenuBar(sidebarId, footbarId) {
  $(sidebarId).addClass('active');
  $(footbarId).addClass('active');
}

// To set session.
function setSession(key, value) {
  sessionStorage.setItem(key, value);
}

// To get session value.
function getSession(key) {
  return sessionStorage.getItem(key);
}

// To get preferred language from local storage. Default value is 'zh-hans'.
function getLocalLang(key) {
  return localStorage.getItem(key) ? localStorage.getItem(key) : 'zh-hans';
}

// Filter indication for candidate record status.
function activeIndicator(classname) {
  $(classname).on('click', function(event) {
    $(classname).removeClass('active');
    $(this).addClass('active')
  })
}

// To indicate viewed page on footbar
function scrollFootbar(id) {
  document.getElementById(id).scrollIntoView()
}

// To prevent unauthorized access to user dashboard.
function authoriseAccess() {
  if (user == null) window.location.href = window.location.origin + '/candidate-login.html'
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
      const fileTag = $('#output');
      const maxBytes = 5000000;

      if (file) {
        if (file.size <= maxBytes) {
          let reader = new FileReader();
          reader.onload = function(event){
            fileTag.attr('src', URL.createObjectURL(file));
            checkFile(fileTag)
            compressUploadedImage(event)
          }
          reader.readAsDataURL(file);
        } else {
          fileTag.attr('src', '')
          $('#file').val('');
          $('.toast').toast('show');
        }
      }
    },
    false
  );
}

// To allow file upload then display.
$('#file').change(function() {
  const fileTag = $('#output');
  const file = this.files[0];
  const maxBytes = 5000000;

  if (file) {
    if (file.size <= maxBytes) {
      let reader = new FileReader();
      reader.onload = function(event){
        fileTag.attr('src', URL.createObjectURL(file));
        checkFile(fileTag)
        compressUploadedImage(event)
      }
      reader.readAsDataURL(file);
    } else {
      fileTag.attr('src', '')
      $('#file').val('');
      $('.toast').toast('show');
    }
  }
});

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

    setSession('support-center-file', dataURL);
  }
  image.src = event.target.result;
}

// To allow delete of uploaded image.
$('.fa-trash').click(function() {
  const fileTag = $('#output');
  fileTag.attr('src', '')
  $('#file').val('');
  checkFile(fileTag)
  sessionStorage.removeItem('support-center-file');
})

// To display uploaded image if it exists.
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

// Eventlister for submitting form for candidate support center.
$('#candidate-support-center').on('click', async() => {
  let lang = getLocalLang('lang') ? getLocalLang('lang') : 'zh-hans';
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
    let response = await fetch('https://api.hskk.org/webapi/support_center/', {
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

// To remove red warning of input field when after input field is not fulfilled.
$('#device, #description').on('keyup', function() {
  validInput('#device');
  validInput('#description');
})

// Verify existance of input value. 
function verifyInput(id) {
  if ($(id).val() === '') {
    return false;
  } else {
    return true;
  }
}

// To have red warning for input field.
function invalidInput(id) {
  $(id).addClass('invalid');
}

// To remove red warning from input field.
function validInput(id) {
  $(id).removeClass('invalid');
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
      return zh
  }
}

// Eventlistener for displaying exam records.
$('.status-filter').on('click', function() {
  $('#web-exam-records')[0].replaceChildren($('#web-exam-records')[0].firstElementChild);
  $('#mobile-exam-records')[0].replaceChildren();
  loadExamRecord($(this).attr('data-status'))
})

// To load/display exam records according to status.
async function loadExamRecord(status) {
  let lang = getLocalLang('lang') ? getLocalLang('lang') : 'zh-hans';
  let records = await fetchAPI('https://api.hskk.org/webapi/test_info_history/')

  if (records) {
    records.forEach(function(record) {
      const mobile_exam_records = $('#mobile-exam-records')[0];
      const mobile_exam_records_template = document.createElement('template');
      const web_exam_records = $('#web-exam-records')[0];
      const web_exam_records_template = document.createElement('template');

      if (status == 'incomplete') {
        if (record.test_status == 0 || record.test_status == 1 || record.test_status == 2 || record.test_status == 3 || record.test_status == 5 || record.test_status == 6 || record.test_status == 10 || record.test_status == 11 || record.test_status == 12 || record.test_status == 20 || record.test_status == 21 ) {
          web_exam_records_template.innerHTML = `
            <div class='card-body border-bottom'>
              <div class='row text-center'>
                <div class='col'>
                  <div class='record'>${record.card_number}</div>
                </div>
                <div class='col'>
                  <div class='record'>${valueTestLevel(lang, record.level)}</div>
                </div>
                <div class='col'>
                  <div class='record'>${record.test_time}</div>
                </div>
                <div class='col'>
                  <div class='btn ${valueTestStatusBtn(record.test_status)}'>${valueTestStatus(lang, record.test_status)}</div>
                </div>
              </div>
            </div>
          `;

          mobile_exam_records_template.innerHTML = `
            <div class='card mb-2 shadow-sm ${valueTestStatusBtn(record.test_status)}'>
              <div class='card-body'>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-299 card-text font-weight-bold'>${transLang(lang, '准考证号', 'Admission Ticket Number', 'Nomor Kartu Ujian', 'رقم الترشيح')}</p>
                  </div>
                  <div class='col'>
                    <p class='card-text'>${record.card_number}</p>
                  </div>
                </div>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-72 card-text font-weight-bold'>${transLang(lang, '考试级别', 'Exam Level', 'Tingkat Ujian', 'مستوى الامتحان')}</p>
                  </div>
                  <div class='col'>
                    <p class='card-text'>${valueTestLevel(lang, record.level)}</p>
                  </div>
                </div>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-289 card-text font-weight-bold'>${transLang(lang, '考试时间', 'Exam Date', 'Waktu Ujian', 'وقت الاختبار')}</p>
                  </div>
                  <div class='col'>
                    <p class='card-text'>${record.test_time}</p>
                  </div>
                </div>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-300 card-text font-weight-bold pb-2'>${transLang(lang, '状态/成绩', 'Status/Score', 'Status/Skor', 'الحالة/النتيجة')}</p>
                  </div>
                  <div class='col'>
                    <div class='btn ${valueTestStatusBtn(record.test_status)}'>${valueTestStatus(lang, record.test_status)}</div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      } else if (status == 'completed') {
        if (record.test_status == 4 || record.test_status == 22 || record.test_status == 23 || record.test_status == 40 || record.test_status == 41 || record.test_status == 42 || record.test_status == 43) {
          web_exam_records_template.innerHTML = `
            <div class='card-body border-bottom'>
              <div class='row text-center'>
                <div class='col'>
                  <div class='record'>${record.card_number}</div>
                </div>
                <div class='col'>
                  <div class='record'>${valueTestLevel(lang, record.level)}</div>
                </div>
                <div class='col'>
                  <div class='record'>${record.test_time}</div>
                </div>
                <div class='col'>
                  <div class='btn ${valueTestStatusBtn(record.test_status)}'>${valueTestStatus(lang, record.test_status)}</div>
                </div>
              </div>
            </div>
          `;

          mobile_exam_records_template.innerHTML = `
            <div class='card mb-2 shadow-sm ${valueTestStatusBtn(record.test_status)}'>
              <div class='card-body'>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-299 card-text font-weight-bold'>${transLang(lang, '准考证号', 'Admission Ticket Number', 'Nomor Kartu Ujian', 'رقم الترشيح')}</p>
                  </div>
                  <div class='col'>
                    <p class='card-text'>${record.card_number}</p>
                  </div>
                </div>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-72 card-text font-weight-bold'>${transLang(lang, '考试级别', 'Exam Level', 'Tingkat Ujian', 'مستوى الامتحان')}</p>
                  </div>
                  <div class='col'>
                    <p class='card-text'>${valueTestLevel(lang, record.level)}</p>
                  </div>
                </div>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-289 card-text font-weight-bold'>${transLang(lang, '考试时间', 'Exam Date', 'Waktu Ujian', 'وقت الاختبار')}</p>
                  </div>
                  <div class='col'>
                    <p class='card-text'>${record.test_time}</p>
                  </div>
                </div>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-300 card-text font-weight-bold pb-2'>${transLang(lang, '状态/成绩', 'Status/Score', 'Status/Skor', 'الحالة/النتيجة')}</p>
                  </div>
                  <div class='col'>
                    <div class='btn ${valueTestStatusBtn(record.test_status)}'>${valueTestStatus(lang, record.test_status)}</div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      } else {
        web_exam_records_template.innerHTML = `
            <div class='card-body border-bottom'>
              <div class='row text-center'>
                <div class='col'>
                  <div class='record'>${record.card_number}</div>
                </div>
                <div class='col'>
                  <div class='record'>${valueTestLevel(lang, record.level)}</div>
                </div>
                <div class='col'>
                  <div class='record'>${record.test_time}</div>
                </div>
                <div class='col'>
                  <div class='btn ${valueTestStatusBtn(record.test_status)}'>${valueTestStatus(lang, record.test_status, record.score_final)}</div>
                </div>
              </div>
            </div>
          `;

          mobile_exam_records_template.innerHTML = `
            <div class='card mb-2 shadow-sm ${valueTestStatusBtn(record.test_status)}'>
              <div class='card-body'>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-299 card-text font-weight-bold'>${transLang(lang, '准考证号', 'Admission Ticket Number', 'Nomor Kartu Ujian', 'رقم الترشيح')}</p>
                  </div>
                  <div class='col'>
                    <p class='card-text'>${record.card_number}</p>
                  </div>
                </div>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-72 card-text font-weight-bold'>${transLang(lang, '考试级别', 'Exam Level', 'Tingkat Ujian', 'مستوى الامتحان')}</p>
                  </div>
                  <div class='col'>
                    <p class='card-text'>${valueTestLevel(lang, record.level)}</p>
                  </div>
                </div>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-289 card-text font-weight-bold'>${transLang(lang, '考试时间', 'Exam Date', 'Waktu Ujian', 'وقت الاختبار')}</p>
                  </div>
                  <div class='col'>
                    <p class='card-text'>${record.test_time}</p>
                  </div>
                </div>
                <div class='row no-gutters mb-2'>
                  <div class='col-sm-3'>
                    <p class='i18n-300 card-text font-weight-bold pb-2'>${transLang(lang, '状态/成绩', 'Status/Score', 'Status/Skor', 'الحالة/النتيجة')}</p>
                  </div>
                  <div class='col'>
                    <div class='btn ${valueTestStatusBtn(record.test_status)}'>${valueTestStatus(lang, record.test_status, record.score_final)}</div>
                  </div>
                </div>
              </div>
            </div>
          `;
      }

      web_exam_records.appendChild(web_exam_records_template.content);
      mobile_exam_records.appendChild(mobile_exam_records_template.content);
    });
  }
}

// To display exam level based on integer via API.
function valueTestLevel(lang, value) {
  switch(value) {
    case 7:
      return transLang(lang, 'HSK口语（初级)', 'HSK Oral (Elementary)', 'HSK Lisan (Dasar)', 'HSK الشفوي (مستوى المبتدئين)')
      break;
    case 8:
      return transLang(lang, 'HSK口语（中级)', 'HSK Oral (Intermediate)', 'HSK Lisan (Menengah)', 'HSK الشفوي (متوسط)')
      break;
    case 9:
      return transLang(lang, 'HSK口语（高级)', 'HSK Oral (Advanced)', 'HSK Lisan (Lanjutan)', 'HSK الشفوي (متقدم)')
      break;
    default:
      return transLang(lang, 'HSK口语（初级)', 'HSK Oral (Elementary)', 'HSK Lisan (Dasar)', 'HSK الشفوي (مستوى المبتدئين)')
  }
}

// To display record status based on integer via API.
function valueTestStatus(lang, value, score) {
  switch(value) {
    case 0:
      return transLang(lang, '未付款', 'Unpaid', 'Tidak dibayar', 'غير مدفوعة الأجر')
      break;
    case 1:
      return transLang(lang, '已付款待考试', 'Paid', 'Dibayar', 'مدفوع')
      break;
    case 2:
      return transLang(lang, '考试准备', 'Exam preparation', 'Persiapan ujian', 'التحضير للامتحانات')
      break;
    case 3:
      return transLang(lang, '考试中', 'In exam', 'Dalam ujian', 'في الامتحان')
      break;
    case 4:
      return transLang(lang, '考试完毕', 'Exam is over', 'Ujian sudah selesai', 'انتهى الامتحان')
      break;
    case 5:
      return transLang(lang, '上传中', 'Uploading', 'Mengunggah', 'تحميل')
      break;
    case 6:
      return transLang(lang, '上传完毕', 'Upload completed', 'Pengunggahan selesai', 'اكتمل التحميل')
      break;
    case 10:
      return transLang(lang, '允许重传', 'Allow retransmission', 'Izinkan transmisi ulang', 'السماح بإعادة الإرسال')
      break;
    case 11:
      return transLang(lang, '重传答案', 'Retransmit answer', 'Kirim ulang jawaban', 'إعادة إرسال الإجابة')
      break;
    case 12:
      return transLang(lang, '重传完毕', 'Retransmission completed', 'Transmisi ulang selesai', 'اكتملت عملية إعادة الإرسال')
      break;
    case 20:
      // return transLang(lang, '阅卷中', 'Marking', 'Menandai', 'العلامات')
      return transLang(lang, '评分中', 'Rating', 'Peringkat', 'تقييم')
      break;
    case 21:
      return transLang(lang, '评分完毕', 'Rating completed', 'Pemeringkatan selesai', 'اكتمل التقييم')
      break;
    case 22:
      // return transLang(lang, '及格', 'Pass', 'Lulus', 'يمر')
      return score
      break;
    case 23:
      // return transLang(lang, '不及格', 'Failed', 'Gagal', 'فشل')
      return score
      break;
    case 40:
      return transLang(lang, '考试过期', 'Expired', 'Kedaluwarsa', 'منتهي الصلاحية')
      break;
    case 41:
    return transLang(lang, '考试取消', 'Canceled', 'Dibatalkan', 'ألغيت')
    break;
    case 42:
      return transLang(lang, '考试中断', 'Interruption', 'Gangguan', 'مقاطعة')
      break;
    case 43:
      return transLang(lang, '考试终止', 'Terminated', 'Dihentikan', 'انقطاع الامتحان')
      break;
    default:
      return transLang(lang, '未付款', 'Unpaid', 'Tidak dibayar', 'غير مدفوعة الأجر')
  }
}

// To display different color of button based on integer via API.
function valueTestStatusBtn(value) {
  switch(value) {
    case 0:
      return ''
      break;
    case 1:
      return ''
      break;
    case 2:
      return ''
      break;
    case 3:
      return ''
      break;
    case 4:
      return ''
      break;
    case 5:
      return ''
      break;
    case 6:
      return ''
      break;
    case 10:
      return ''
      break;
    case 11:
      return ''
      break;
    case 12:
      return ''
      break;
    case 20:
      return 'status-ongoing'
      break;
    case 21:
      return 'status-ongoing'
      break;
    case 22:
      return 'active'
      break;
    case 23:
      return ''
      break;
    case 40:
      return 'status-terminate'
      break;
    case 41:
      return 'status-terminate'
      break;
    case 42:
      return 'status-terminate'
      break;
    case 43:
      return 'status-terminate'
      break;
    default:
      return ''
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

// To fetch API
async function fetchAPI(api) {
  let response = await fetch(api, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${user}`
      }
    })
  let data = await response.json();
  let records = data.data;

  return records
}

// Populate info from calling API on user dashboard.
async function personalInfo() {
  let lang = getLocalLang('lang') ? getLocalLang('lang') : 'zh-hans';
  let records = await fetchAPI('https://api.hskk.org/webapi/homepage/')
  let personal_records = await fetchAPI('https://api.hskk.org/webapi/register_default_info/')

  $('#pending-test-count').html(`(${records.read_count})`);

  if (personal_records.email == '') {
    $('#candidate-name').html(getLocal('username'));
  } else {
    $('#candidate-name').html(transLang(lang, personal_records.name_cn, personal_records.name_en, personal_records.name_en, personal_records.name_en));
  }
}

// To get value from local storage.
function getLocal(key) {
  return localStorage.getItem(key);
}