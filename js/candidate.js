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
      break;
    case 'important-notice.html':
      authoriseAccess()
      activeMenuBar('#notice-sidebar', '#notice-footbar')
      activeIndicator('.notice-indicator-dot')
      break;
    case 'abnormal-alert.html':
      authoriseAccess()
      activeMenuBar('#alert-sidebar', '#alert-footbar')
      activeIndicator('.alert-indicator-dot')
      break;
    case 'support-center.html':
      authoriseAccess()
      activeMenuBar('#support-sidebar', '#support-footbar')
      break;
    case 'faqs.html':
      authoriseAccess()
      activeMenuBar('#faqs-sidebar', '#faqs-footbar')
      break;
    case 'exam-record.html':
      authoriseAccess()
      activeMenuBar('#record-sidebar', '#record-footbar')
      activeIndicator('.status-filter')
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

function authoriseAccess() {
  if (user == null) window.location.href = window.location.origin + '/candidate-login.html'
}
