const navbar = document.getElementById('navbar');
const login_modal = document.getElementById('login-modal');
const navbar_template = document.createElement('template');
const login_modal_template = document.createElement('template');

navbar_template.innerHTML = `
  <a class='navbar-brand mr-auto' href='index.html'><img src='images/logo.png' class='img-fluid w-75' alt='Responsive image'></a>
  <a class='nav-link dropdown-toggle d-block d-sm-none d-md-block d-lg-none' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
    <i class='fa-solid fa-globe fa-lg secondary-color'></i>
  </a>
  <div class='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
    <a class='dropdown-item i18n' lang='zh'>中文</a>
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
        <a id='home-menu-btn' class='nav-link menu-btn i18n-1' href='home.html'>首页</a>
      </li>
      <li class='nav-item'>
        <a id='apply-menu-btn' class='nav-link menu-btn i18n-2' href='application.html'>HSK口语移动端考期</a>
        <p id='apply-modal-btn' class='ml-2 mr-2 mt-2 pointer menu-btn i18n-2' data-toggle='modal' data-target='#staticBackdrop'>HSK口语移动端考期</p>
      </li>
      <li class='nav-item'>
        <a id='partner-menu-btn' class='nav-link menu-btn i18n-3' href='partner.html'>考点与学校合作</a>
      </li>
      <li class='nav-item'>
        <a id='news-menu-btn' class='nav-link menu-btn i18n-4' href='home.html#home-news'>最新质讯</a>
      </li>
      <li class='nav-item mb-1'>
        <a id='faqs-menu-btn' class='nav-link menu-btn i18n-5' href='home.html#home-faqs'>常见问题</a>
      </li>
    </ul>
    <ul class='navbar-nav'>
      <li class='nav-item dropdown show d-none d-sm-block d-md-none d-lg-block'>
        <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          <i class='fa-solid fa-globe fa-lg mt-3 align-self-center secondary-color'></i>
        </a>
        <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
          <a class='dropdown-item i18n' lang='zh'>中文</a>
          <a class='dropdown-item i18n' lang='en'>English</a>
          <a class='dropdown-item i18n' lang='id'>Bahasa Indonesia</a>
          <a class='dropdown-item i18n' lang='ar'>عربي</a>
        </div>
      </li>
      <div id='user-public'>
        <a href='candidate-login.html' class='btn btn-sm active m-1 p-2 pr-3 pl-3 i18n-6'>考生登入/注册</a>
        <a href='partner-login.html' class='btn btn-sm active m-1 p-2 pr-3 pl-3 i18n-7'>合作方登入</a>
      </div>
      <div id='user-login'>
        <i class='fa-solid fa-right-from-bracket fa-lg mt-4 ml-2 align-self-center secondary-color d-block'></i>
      </div>
    </ul>
  </div>
`;

login_modal_template.innerHTML = `
  <div class='modal fade' id='staticBackdrop' data-backdrop='static' data-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
    <div class='modal-dialog modal-dialog-centered'>
      <div class='modal-content'>
        <div class='modal-header border-0 justify-content-center'>
          <h5 class='modal-title' id='staticBackdropLabel'>网上报名步骤</h5>
        </div>
        <div class='modal-body text-muted text-left'>
          <p>第一步：注册用户并登入</p>
          <p>第二步：选择考期</p>
          <p>第三步：输入考生资料</p>
          <p>第四步：确认考生信息并提交预报名</p>
          <p>第五步：在线付款</p>
          <p>第六步：成功提交预报名表并缴费，通过电子邮件接收收据</p>
        </div>
        <div class='modal-footer border-0 flex-lg-row flex-column-reverse justify-content-center'>
          <button type='button' class='btn btn-sm p-2 w180' data-dismiss='modal'>取消</button>
          <button type='button' class='btn btn-sm p-2 w180 active'>考生登入/注册</button>
        </div>
      </div>
    </div>
  </div>
`

if (navbar) navbar.appendChild(navbar_template.content);
if (login_modal) login_modal.appendChild(login_modal_template.content);

$('.menu-btn').on('click', function() {
  $('.menu-btn').removeClass('active');
  $(this).addClass('active');
});

// sessionStorage.setItem('user', 'true');
// sessionStorage.removeItem('user')

let user = sessionStorage.getItem('user');

if (user == null) {
  $('#apply-menu-btn').remove()
  $('#user-login').remove()
} else {
  $('#apply-modal-btn').remove()
  $('#user-public').remove()
}

// var loc = window.location.pathname;
// var path = loc.substring(0, loc.lastIndexOf('/'));
// var directoryName = path.substring(path.lastIndexOf("/")+1);

// console.log(directoryName);