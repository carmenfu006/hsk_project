const footer = document.getElementById('footer');
const user_footer = document.getElementById('user-footer');
const footer_template = document.createElement('template');
const user_footer_template = document.createElement('template');

footer_template.innerHTML = `
  <div class='container pt-5 pb-5'>
    <div class='row'>
      <div class='col-12 mb-3 fw500 fs28'>
        <h5 class='i18n-8'>全球唯一HSK口语移动端考试</h5>
      </div>
    </div>
    <div class='row'>
      <div class='col-lg-6 col-md-12 col-sm-12 fw400 fs12'>
        <div class='row'>
          <div class='col mb-2'>
            <span class='i18n-9'>联系我们</span>
            <span><a class='text-white' href='mailto:support@hskk.org'>: support@hskk.org</a></span>
          </div>
          <div class='col mb-2'>
            <span class='i18n-10'>友情链接</span>
            <span><a class='text-white' href='https://www.chinesetest.cn'>: www.chinesetest.cn</a></span>
          </div>
        </div>
        <div class='row'>
          <div class='col mb-5'>
            <span class='i18n-11'>更多质讯</span>
            <span><a class='text-white' href='https://www.hskk.org'>: www.hskk.org</a></span>
          </div>
        </div>
      </div>
      <div class='col-lg-6 col-md-12 col-sm-12 fw500 fs12'>
        <span class='i18n-12'>HSK口语移动端考试App下载</span>
        <div class='row pt-3 d-flex justify-content-start container'>
          <img src='images/mobile-app-store-badge.png' class='img-fluid mr-3 mb-2' alt='Responsive image'>
          <img src='images/mobile-google-play-badge.png' class='img-fluid mr-3 mb-2' alt='Responsive image'>
          <img src='images/mobile-tengxun-badge.png' class='img-fluid mr-3 mb-2' alt='Responsive image'>
        </div>
      </div>
    </div>
    <div class='row border-bottom pt-5'></div>
    <div class='row pt-5 flex-lg-row flex-column-reverse'>
      <div class='col-lg-6 col-md-12 col-sm-12 order-lg-0 order-md-0 order-sm-0 fw400 fs12'>
        Copyright © 2023 HSKk Mobile Exam Center. All rights reserved.
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
      <div class='col-lg-6 col-md-12 col-sm-12 fw400 fs12'>
        <div class='row'>
          <div class='col mb-2'>
            <span class='i18n-9'>联系我们</span>
            <span><a class='text-white' href='mailto:support@hskk.org'>: support@hskk.org</a></span>
          </div>
          <div class='col mb-2'>
            <span class='i18n-10'>友情链接</span>
            <span><a class='text-white' href='https://www.chinesetest.cn'>: www.chinesetest.cn</a></span>
          </div>
        </div>
        <div class='row'>
          <div class='col mb-5'>
            <span class='i18n-11'>更多质讯</span>
            <span><a class='text-white' href='https://www.hskk.org'>: www.hskk.org</a></span>
          </div>
        </div>
      </div>
      <div class='col-lg-6 col-md-12 col-sm-12 fw500 fs12'>
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
        Copyright © 2023 HSKk Mobile Exam Center. All rights reserved.
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

if (footer) footer.appendChild(footer_template.content);
if (user_footer) user_footer.appendChild(user_footer_template.content);