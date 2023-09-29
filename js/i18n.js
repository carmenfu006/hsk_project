setQueryString()

translateWeb('.i18n-1', '首页', 'Home', 'Beranda', 'الصفحة الرئيسية')

$('.i18n').on('click', function() {
  let lang = $(this).attr('lang');
  urlAddParams('lang', lang);
});

function urlAddParams(key, value) {
  let url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.location.href = url.href;
}

function translateWeb(classname, zh, en, id, ar) {
  let url = new URL(window.location.href);
  let lang = url.searchParams.get('lang');

  switch(lang) {
    case 'zh':
      $(classname).html(zh);
      break;
    case 'en':
      $(classname).html(en);
      break;
    case 'id':
      $(classname).html(id);
      break;
    case 'ar':
      $(classname).html(ar);
      break;
    default:
      $(classname).html(zh);
  }
}

function setQueryString() {
  let queryString = new URL(window.location).search;
  $('a[href*=".html"]').each(function() {
    let current = this.href.split('#')[0];
    if (window.location.hash) {
      let hash = this.href.split('#')[1];
      this.href = current + queryString + '#' + hash;
    }
  });
}
