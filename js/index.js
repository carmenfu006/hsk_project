const navbar = document.getElementById('navbar');
const footer = document.getElementById('footer');
const navbar_template = document.createElement('template');
const footer_template = document.createElement('template');
const bootstrap = document.createElement('template');

navbar_template.innerHTML = `
<a class="navbar-brand" href="index.html"><img src="images/logo.png" class="img-fluid" alt="Responsive image"></a>
<a class="nav-link dropdown-toggle d-block d-sm-none" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i class="fa-solid fa-globe secondary-color"></i>
</a>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <a class="nav-link" href="#">首页</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">HSK口语移动端考期</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">考点与学校合作</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">最新质讯</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">常见问题</a>
    </li>
  </ul>
  <ul class="navbar-nav">
    <li class="nav-item dropdown show">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa-solid fa-globe fa-lg mt-3 secondary-color"></i>
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </li>
    <button type="button" class="btn btn-sm primary-color-bg secondary-color m-1 p-2 pr-3 pl-3">考生登入/注册</button>
    <button type="button" class="btn btn-sm primary-color-bg secondary-color m-1 p-2 pr-3 pl-3">合作方登入</button>
  </ul>
</div>
`;

footer_template.innerHTML = `
  <h1>Hello, World!</h1>
  <p>Footer</p>
`;

// bootstrap.innerHTML = `
//   <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
//   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
//   <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
// `;

// navbar.appendChild(navbar_template.content);
footer.appendChild(footer_template.content);
// document.body.appendChild(bootstrap.content);