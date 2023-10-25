const footer = document.getElementById('footer');
const user_footer = document.getElementById('user-footer');
const user_footbar = document.getElementById('user-footbar');
const partner_footbar = document.getElementById('partner-footbar');
const footer_template = document.createElement('template');
const user_footer_template = document.createElement('template');
const user_footbar_template = document.createElement('template');
const partner_footbar_template = document.createElement('template');

footer_template.innerHTML = `
  <div class='container pt-5 pb-5'>
    <div class='row'>
      <div class='col-12 mb-3 fw500 fs28'>
        <h5 class='i18n-8'>全球唯一HSK口语移动端考试</h5>
      </div>
    </div>
    <div class='row'>
      <div class='col-lg-8 col-md-12 col-sm-12 fw500 fs14'>
        <div class='row no-gutters'>
          <div class='col-lg-5 col-md-12 col-sm-12 mb-2'>
            <span class='i18n-9'>联系我们</span>
            <span><a class='text-white' href='mailto:support@hskk.org'>: support@hskk.org</a></span>
          </div>
          <div class='col mb-2'>
            <div class='d-flex justify-content-start'>
              <span class='i18n-10'>友情链接</span>
              <span class='ml-1'>:</span>
              <a class='text-white' href='https://www.chinesetest.cn'>
              <img src='images/chinese-testing-logo.png' width='40px' class='d-block ml-2 mr-1'/>
              </a>
              <a class='text-white' href='https://www.chinesetest.cn'>
                <p class='p-0 m-0 fs11'>汉语考试服务网</p>
                <p class='p-0 m-0 fs11'>www.chinesetest.cn</p>
              </a>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col mb-5'>
            <span class='i18n-11'>更多资讯</span>
            <span><a class='text-white' href='https://www.hskk.org'>: www.hskk.org</a></span>
          </div>
        </div>
      </div>
      <div class='col-lg-4 col-md-12 col-sm-12 fw500 fs14'>
      <!-- <span class='i18n-12'>HSK口语移动端考试App下载</span>
        <div class='row pt-3 d-flex justify-content-start container'>
          <img src='images/mobile-app-store-badge.png' class='img-fluid mr-3 mb-2' alt='Responsive image'>
          <img src='images/mobile-google-play-badge.png' class='img-fluid mr-3 mb-2' alt='Responsive image'>
          <img src='images/mobile-tengxun-badge.png' class='img-fluid mr-3 mb-2' alt='Responsive image'>
        </div> -->
      </div>
    </div>
    <div class='row border-bottom pt-5'></div>
    <div class='row pt-5 flex-lg-row flex-column-reverse'>
      <div class='col-lg-6 col-md-12 col-sm-12 order-lg-0 order-md-0 order-sm-0 fw400 fs12'>
        Copyright © 2023 HSK Speaking Test Mobile Exam Center. All rights reserved.
      </div>
      <div class='col-lg-6 col-md-12 col-sm-12 order-lg-1 order-md-1 order-sm-1'>
        <div class='d-flex justify-content-lg-end mb-4'>
          <img src='images/twitter-icon.png' class='img-fluid mr-3' alt='Responsive image'>
          <img src='images/linkedin-icon.png' class='img-fluid mr-3' alt='Responsive image'>
          <img src='images/facebook-icon.png' class='img-fluid mr-3' alt='Responsive image'>
        </div>
      </div>
    </div>
  </div>
`;

user_footer_template.innerHTML = `
  <div class='container pt-5 pb-5'>
    <div class='row'>
      <div class='col-12 mb-3 fw500 fs28'>
        <h5 class='i18n-8'>全球唯一HSK口语移动端考试</h5>
      </div>
    </div>
    <div class='row'>
      <div class='col-lg-6 col-md-12 col-sm-12 fw500 fs14'>
        <div class='row no-gutters'>
          <div class='col mb-2'>
            <span class='i18n-9'>联系我们</span>
            <span><a class='text-white' href='mailto:support@hskk.org'>: support@hskk.org</a></span>
          </div>
          <div class='col mb-2'>
            <div class='d-flex justify-content-start'>
              <span class='i18n-10'>友情链接</span>
              <span class='ml-1'>:</span>
              <a class='text-white' href='https://www.chinesetest.cn'>
              <img src='../images/chinese-testing-logo.png' width='40px' class='d-block ml-2 mr-1'/>
              </a>
              <a class='text-white' href='https://www.chinesetest.cn'>
                <p class='p-0 m-0 fs11'>汉语考试服务网</p>
                <p class='p-0 m-0 fs11'>www.chinesetest.cn</p>
              </a>
            </div>
          </div>
        </div>
        <div class='row'>
          <div class='col mb-5'>
            <span class='i18n-11'>更多资讯</span>
            <span><a class='text-white' href='https://www.hskk.org'>: www.hskk.org</a></span>
          </div>
        </div>
      </div>
      <div class='col-lg-6 col-md-12 col-sm-12 fw500 fs14'>
        <span class='i18n-12'>HSK口语移动端考试App下载</span>
        <div class='row pt-3 d-flex justify-content-start container'>
          <img src='../images/mobile-app-store-badge.png' class='img-fluid mr-3 mb-2' alt='Responsive image'>
          <img src='../images/mobile-google-play-badge.png' class='img-fluid mr-3 mb-2' alt='Responsive image'>
          <img src='../images/mobile-tengxun-badge.png' class='img-fluid mr-3 mb-2' alt='Responsive image'>
        </div>
      </div>
    </div>
    <div class='row border-bottom pt-5'></div>
    <div class='row pt-5 flex-lg-row flex-column-reverse'>
      <div class='col-lg-6 col-md-12 col-sm-12 order-lg-0 order-md-0 order-sm-0 fw400 fs12'>
        Copyright © 2023 HSK Speaking Test Mobile Exam Center. All rights reserved.
      </div>
      <div class='col-lg-6 col-md-12 col-sm-12 order-lg-1 order-md-1 order-sm-1'>
        <div class='d-flex justify-content-lg-end mb-4'>
          <img src='../images/twitter-icon.png' class='img-fluid mr-3' alt='Responsive image'>
          <img src='../images/linkedin-icon.png' class='img-fluid mr-3' alt='Responsive image'>
          <img src='../images/facebook-icon.png' class='img-fluid mr-3' alt='Responsive image'>
        </div>
      </div>
    </div>
  </div>
`;

user_footbar_template.innerHTML = `
  <div class='row user-footbar-width no-gutters fs10'>
    <div id='dashboard-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='dashboard.html'>
        <i class='fa-solid fa-house'></i>
        <p class='i18n-272'>个人主页</p>
      </a>
    </div>
    <div id='instruction-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='exam-instruction.html'>
        <i class='fa-solid fa-circle-exclamation'></i>
        <p class='i18n-168'>考试须知</p>
      </a>
    </div>
    <div id='inspection-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='inspection-instruction.html'>
        <i class='fa-solid fa-mobile-screen'></i>
        <p class='i18n-273'>设备检测指示</p>
      </a>
    </div>
    <div id='notice-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='important-notice.html'>
        <i class='fa-solid fa-triangle-exclamation'></i>
        <p class='i18n-274'>重要提示</p>
      </a>
    </div>
    <div id='alert-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='abnormal-alert.html'>
        <i class='fa-solid fa-circle-xmark'></i>
        <p class='i18n-221'>异常警告</p>
      </a>
    </div>
    <div id='support-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='support-center.html'>
        <i class='fa-solid fa-shield-heart'></i>
        <p class='i18n-275'>⽀援中⼼</p>
      </a>
    </div>
    <div id='faqs-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='faqs.html'>
        <i class='fa-solid fa-circle-question'></i>
        <p class='i18n-5'>常⻅问题</p>
      </a>
    </div>
    <div id='record-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='exam-record.html'>
        <i class='fa-solid fa-gear'></i>
        <p class='i18n-276'>考试记录</p>
      </a>
    </div>
  </div>
`;

partner_footbar_template.innerHTML = `
  <div class='d-flex justify-content-center'>
  <div class='row partner-footbar-width'>
    <div id='candidate-management-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='candidate-management.html'>
        <i class='fa-solid fa-user'></i>
        <p class='i18n-302'>考⽣管理</p>
      </a>
    </div>
    <div id='faqs-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='faqs.html'>
        <i class='fa-solid fa-comment-dots'></i>
        <p class='i18n-5'>常⻅问题</p>
      </a>
    </div>
    <div id='support-footbar' class='col text-center pt-2 nav-footbar'>
      <a href='support-center.html'>
        <i class='fa-solid fa-shield-heart'></i>
        <p class='i18n-275'>⽀援中⼼</p>
      </a>
    </div>
  </div>
  </div>
`;

if (footer) footer.appendChild(footer_template.content);
if (user_footer) user_footer.appendChild(user_footer_template.content);
if (user_footbar) user_footbar.appendChild(user_footbar_template.content);
if (partner_footbar) partner_footbar.appendChild(partner_footbar_template.content);