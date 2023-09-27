const navbar = document.getElementById('navbar');
const navbar_template = document.createElement('template');

navbar_template.innerHTML = `
  <a class='navbar-brand mr-auto' href='index.html'><img src='images/logo.png' class='img-fluid w-75' alt='Responsive image'></a>
  <a class='nav-link dropdown-toggle d-block d-sm-none d-md-block d-lg-none' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
    <i class='fa-solid fa-globe secondary-color'></i>
  </a>
  <div class='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
    <a class='dropdown-item' href='#'>Action 2</a>
    <a class='dropdown-item' href='#'>Another action</a>
    <div class='dropdown-divider'></div>
    <a class='dropdown-item' href='#'>Something else here</a>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class='collapse navbar-collapse m-3' id='navbarSupportedContent'>
    <ul class='navbar-nav mr-auto'>
      <li class='nav-item'>
        <a id='home-menu-btn' class='nav-link' href='home.html'>首页</a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' href='#'>HSK口语移动端考期</a>
      </li>
      <li class='nav-item'>
        <a id='collaboration-menu-btn' class='nav-link' href='collaboration.html'>考点与学校合作</a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' href='#'>最新质讯</a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' href='#'>常见问题</a>
      </li>
    </ul>
    <ul class='navbar-nav'>
      <li class='nav-item dropdown show d-none d-sm-block'>
        <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          <i class='fa-solid fa-globe fa-lg mt-3 secondary-color'></i>
        </a>
        <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
          <a class='dropdown-item' href='#'>Action</a>
          <a class='dropdown-item' href='#'>Another action</a>
          <div class='dropdown-divider'></div>
          <a class='dropdown-item' href='#'>Something else here</a>
        </div>
      </li>
      <button type='button' class='btn btn-sm active m-1 p-2 pr-3 pl-3'>考生登入/注册</button>
      <button type='button' class='btn btn-sm active m-1 p-2 pr-3 pl-3'>合作方登入</button>
    </ul>
  </div>
`;

navbar.appendChild(navbar_template.content);