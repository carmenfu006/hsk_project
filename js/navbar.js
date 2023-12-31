// navbar.js included in every HTML to insert accordingly where when user is not logged-in or user is logged-in.

const partner_sidebar = document.getElementById('partner-sidebar');
const user_sidebar = document.getElementById('user-sidebar');
const user_navbar = document.getElementById('user-navbar');
const navbar = document.getElementById('navbar');
const login_modal = document.getElementById('login-modal');
const user_navbar_template = document.createElement('template');
const navbar_template = document.createElement('template');
const login_modal_template = document.createElement('template');
const user_sidebar_template = document.createElement('template');
const partner_sidebar_template = document.createElement('template');

// This is the main navbar element.
navbar_template.innerHTML = `
  <a class='navbar-brand mr-auto' href='index.html'><img src='images/logo.png' id='navbar-logo' class='img-fluid w-75' alt='Responsive image'></a>
  <a class='nav-link dropdown-toggle d-block d-sm-block d-md-block d-lg-none' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
    <i class='fa-solid fa-globe fa-lg secondary-color'></i>
  </a>
  <div class='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
    <a class='dropdown-item i18n' lang='zh-hans'>中文</a>
    <a class='dropdown-item i18n' lang='en'>English</a>
    <a class='dropdown-item i18n' lang='id'>Bahasa Indonesia</a>
    <a class='dropdown-item i18n' lang='ar'>عربي</a>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="secondary-color"><i class="fa-solid fa-bars"></i></span>
  </button>
  <div class='collapse navbar-collapse m-3' id='navbarSupportedContent'>
    <ul class='navbar-nav mr-auto'>
      <li class='nav-item'>
        <a id='home-menu-btn' class='nav-link menu-btn mr-2 i18n-1' href='index.html'>首页</a>
      </li>
      <li class='nav-item'>
        <a id='apply-menu-btn' class='nav-link menu-btn i18n-2' href='application.html'>HSK口语移动端考期</a>
        <!-- <p id='apply-modal-btn' class='mr-2 mt-2 pointer menu-btn i18n-2' data-toggle='modal' data-target='#staticBackdrop'>HSK口语移动端考期</p> -->
        <a id='apply-modal-btn' class='nav-link menu-btn i18n-2' href='index.html#exam-datetime'>HSK口语移动端考期</a>
      </li>
      <li class='nav-item'>
        <a id='partner-menu-btn' class='nav-link menu-btn i18n-3' href='partner.html'>考点与学校合作</a>
      </li>
      <li class='nav-item'>
        <a id='news-menu-btn' class='nav-link menu-btn i18n-4' href='index.html#home-news'>最新质讯</a>
      </li>
      <li class='nav-item mb-1'>
        <a id='faqs-menu-btn' class='nav-link menu-btn i18n-5' href='index.html#home-faqs'>常见问题</a>
      </li>
    </ul>
    <ul class='navbar-nav'>
      <li class='nav-item dropdown show d-none d-sm-none d-md-none d-lg-block'>
        <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          <i class='fa-solid fa-globe fa-lg mt-3 align-self-center secondary-color'></i>
        </a>
        <div class='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
          <a class='dropdown-item i18n' lang='zh-hans'>中文</a>
          <a class='dropdown-item i18n' lang='en'>English</a>
          <a class='dropdown-item i18n' lang='id'>Bahasa Indonesia</a>
          <a class='dropdown-item i18n' lang='ar'>عربي</a>
        </div>
      </li>
      <div id='user-public'>
        <a href='candidate-login.html' class='i18n-6 btn btn-sm active m-1 p-2 pr-3 pl-3'>考生登入/注册</a>
        <a href='partner-login.html' class='i18n-7 btn btn-sm active m-1 p-2 pr-3 pl-3'>合作方登入</a>
      </div>
      <div id='candidate-dashboard' class='d-none pointer'>
        <a href='/candidate/dashboard.html' class='i18n-272 mt-2 mr-2 pt-1'>个人主页</a>
      </div>
      <div id='user-logout' class='d-flex pointer'>
        <span class='i18n-154 mt-2 pt-1'>登出</span>
        <span><i class='fa-solid fa-right-from-bracket fa-lg mt-4 ml-2 align-self-center secondary-color d-block'></i></span>
      </div>
      <div id='partner-logout' class='d-flex pointer'>
        <span class='i18n-154 mt-2 pt-1'>登出</span>
        <span><i class='fa-solid fa-right-from-bracket fa-lg mt-4 ml-2 align-self-center secondary-color d-block'></i></span>
      </div>
    </ul>
  </div>
`;

// This is the modal element where users can choose to login from here whenever they are not logged in. This modal can be triggered on the homepage of the exam timetable.
login_modal_template.innerHTML = `
  <div class='modal fade' id='staticBackdrop' data-backdrop='static' data-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
    <div class='modal-dialog modal-dialog-centered'>
      <div class='modal-content'>
        <div class='modal-header border-0 justify-content-center'>
          <h5 class='modal-title i18n-318' id='staticBackdropLabel'>网上报名步骤</h5>
        </div>
        <div class='modal-body text-muted text-left'>
          <p class='i18n-319'>第一步：注册用户并登入</p>
          <p class='i18n-320'>第二步：选择考期</p>
          <p class='i18n-321'>第三步：输入考生资料</p>
          <p class='i18n-322'>第四步：确认考生信息并提交预报名</p>
          <p class='i18n-323'>第五步：在线付款</p>
          <p class='i18n-324'>第六步：成功提交预报名表并缴费，通过电子邮件接收收据</p>
        </div>
        <div class='modal-footer border-0 flex-lg-row flex-column-reverse justify-content-center'>
          <button type='button' class='i18n-155 btn btn-sm p-2 w180' data-dismiss='modal'>取消</button>
          <a href='candidate-login.html?application=true' class='i18n-6 btn btn-sm p-2 w180 active'>考生登入/注册</a>
        </div>
      </div>
    </div>
  </div>
`;

// This navbar element is when user visits dashboard.
user_navbar_template.innerHTML = `
  <a class='navbar-brand mr-auto' href='../index.html'><img src='../images/logo.png' id='navbar-user-logo' class='img-fluid w-75' alt='Responsive image'></a>
  <a class='nav-link dropdown-toggle d-block d-sm-block d-md-block d-lg-none' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
    <i class='fa-solid fa-globe fa-lg secondary-color'></i>
  </a>
  <div class='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
    <a class='dropdown-item i18n' lang='zh-hans'>中文</a>
    <a class='dropdown-item i18n' lang='en'>English</a>
    <a class='dropdown-item i18n' lang='id'>Bahasa Indonesia</a>
    <a class='dropdown-item i18n' lang='ar'>عربي</a>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="secondary-color"><i class="fa-solid fa-bars"></i></span>
  </button>
  <div class='collapse navbar-collapse m-3' id='navbarSupportedContent'>
    <ul class='navbar-nav mr-auto'>
    </ul>
    <ul class='navbar-nav'>
      <li class='nav-item dropdown show d-none d-sm-none d-md-none d-lg-block mr-2'>
        <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          <i class='fa-solid fa-globe fa-lg mt-3 align-self-center secondary-color'></i>
        </a>
        <div class='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
          <a class='dropdown-item i18n' lang='zh-hans'>中文</a>
          <a class='dropdown-item i18n' lang='en'>English</a>
          <a class='dropdown-item i18n' lang='id'>Bahasa Indonesia</a>
          <a class='dropdown-item i18n' lang='ar'>عربي</a>
        </div>
      </li>
      <div id='candidate-dashboard' class='d-none pointer'>
        <a href='/candidate/dashboard.html' class='i18n-272 mt-2 mr-2 pt-1'>个人主页</a>
      </div>
      <div id='user-logout' class='d-flex pointer'>
        <span class='i18n-154 mt-2 pt-1'>登出</span>
        <span><i class='fa-solid fa-right-from-bracket fa-lg mt-4 ml-2 align-self-center secondary-color d-block'></i></span>
      </div>
      <div id='partner-logout' class='d-flex pointer'>
        <span class='i18n-154 mt-2 pt-1'>登出</span>
        <span><i class='fa-solid fa-right-from-bracket fa-lg mt-4 ml-2 align-self-center secondary-color d-block'></i></span>
      </div>
    </ul>
  </div>
`;

// This sidebar element is shown in user dashboard.
user_sidebar_template.innerHTML = `
  <a href='dashboard.html' id='dashboard-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-house mr-2'></i>
    <span class='i18n-272'>个人主页</span>
  </a>
  <a href='exam-instruction.html' id='instruction-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-circle-exclamation mr-2'></i>
    <span class='i18n-168'>考试须知</span>
  </a>
  <a href='inspection-instruction.html' id='inspection-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-mobile-screen mr-2'></i>
    <span class='i18n-273'>设备检测指示</span>
  </a>
  <div class='border-bottom mt-3 mb-3'></div>
  <a href='important-notice.html' id='notice-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-triangle-exclamation mr-2'></i>
    <span class='i18n-274'>重要提示</span>
  </a>
  <a href='abnormal-alert.html' id='alert-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-circle-xmark mr-2'></i>
    <span class='i18n-221'>异常警告</span>
  </a>
  <div class='border-bottom mt-3 mb-3'></div>
  <a href='support-center.html' id='support-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-shield-heart mr-2'></i>
    <span class='i18n-275'>⽀援中⼼</span>
  </a>
  <a href='faqs.html' id='faqs-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-circle-question mr-2'></i>
    <span class='i18n-5'>常⻅问题</span>
  </a>
  <div class='border-bottom mt-3 mb-3'></div>
  <a href='exam-record.html' id='record-sidebar' class='w3-bar-item w3-button'>
    <i class='fa-solid fa-gear mr-2'></i>
    <span class='i18n-276'>考试记录</span>
  </a>
`;

// This sidebar element is shown in partner dashboard.
partner_sidebar_template.innerHTML = `
  <a href='candidate-management.html' id='candidate-management-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-user mr-2'></i>
    <span class='i18n-302'>考⽣管理</span>
  </a>
  <a href='faqs.html' id='faqs-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-comment-dots mr-2'></i>
    <span class='i18n-5'>常⻅问题</span>
  </a>
  <a href='support-center.html' id='support-sidebar' class='w3-bar-item w3-button rounded'>
    <i class='fa-solid fa-shield-heart mr-2'></i>
    <span class='i18n-275'>⽀援中⼼</span>
  </a>
`;

// To check whether ID exists in HTML then append navbar/sidebar/modal elements.
if (navbar) navbar.appendChild(navbar_template.content);
if (partner_sidebar) partner_sidebar.appendChild(partner_sidebar_template.content);
if (user_sidebar) user_sidebar.appendChild(user_sidebar_template.content);
if (user_navbar) user_navbar.appendChild(user_navbar_template.content);
if (login_modal) login_modal.appendChild(login_modal_template.content);

// To indicate selected page or portion.
$('.menu-btn').on('click', function() {
  $('.menu-btn').removeClass('active');
  $(this).addClass('active');
});

// To hide and show certain buttons for user and partner logged in scenario.
let user = localStorage.getItem('user');
let partner = localStorage.getItem('partner');

if (user == null) {
  $('#apply-menu-btn').hide()
  $('#apply-modal-btn').show()
  $('#user-logout').hide()
  $('#user-logout').removeClass('d-flex')
  $('#user-public').show()
  $('#candidate-dashboard').removeClass('d-flex')
} else {
  $('#apply-menu-btn').show()
  $('#apply-modal-btn').hide()
  $('#user-logout').show()
  $('#user-public').hide()
  $('#candidate-dashboard').addClass('d-flex')
}

if (partner == null) {
  $('#partner-logout').hide()
  $('#partner-logout').removeClass('d-flex')
} else {
  $('#user-public').hide()
}

// Clear session storage and local storage when user or partner logout.
$('#user-logout, #partner-logout').on('click', function(e) {
  clearInfoSession();
  clearInfoLocal();
  window.location.href = window.location.origin + '/index.html';
});

// To collapse mobile view navbar when certain menu is triggered. Most of the menu here are navigated using hashtag.
$('#navbarDropdown, #apply-modal-btn, #news-menu-btn, #faqs-menu-btn').on('click', function(e) {
  $('.navbar-collapse').removeClass('show');
});

// To clear all session storage.
let clearInfoSession = function() {
  sessionStorage.clear();
}

// To clear all local storage except language.
let clearInfoLocal = function() {
  let lang = localStorage.getItem('lang');
  localStorage.clear();
  localStorage.setItem('lang', lang);
}