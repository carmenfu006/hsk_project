$('.toast').toast('show');

instructionProgressIndicator()

function instructionProgressIndicator() {
  const progressbar = document.getElementById('instruction-progressbar');
  const progressbar_template = document.createElement('template');
  const page = document.URL.split(/[?#]/)[0].split('/').pop();
  
  progressbar_template.innerHTML = `
  <div class='instruction-progress-indicator-width'>
    <div class='row instruction-progress-indicator-bar'>
      <div class='instruction-progress-indicator-dot step-1'>1</div>
      <div class='instruction-progress-indicator-word step-1'>下载移动端考试APP</div>
      <div class='instruction-progress-indicator-line step-2'></div>
      <div class='instruction-progress-indicator-dot step-2'>2</div>
      <div class='instruction-progress-indicator-word step-2'>考前需知</div>
      <div class='instruction-progress-indicator-line step-3'></div>
      <div class='instruction-progress-indicator-dot step-3'>3</div>
      <div class='instruction-progress-indicator-word step-3'>考试当天</div>
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
    if(timeleft <= 0){
      clearInterval(timer);
      window.location.href = 'dashboard.html'
    }
    $('#timer').html(timeleft);
    timeleft -= 1;
  }, 1000);
}