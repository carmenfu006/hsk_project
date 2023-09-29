setQueryString()

translateWeb('.i18n-1', '首页', 'Home', 'Beranda', 'الصفحة الرئيسية')
translateWeb('.i18n-2', 'HSK口语移动端考期', 'HSK Spoken Mobile Test Dates', 'Jadwal Ujian HSK Lisan Versi Seluler', 'فترة الامتحان لاختبار HSK الشفوي عبر الهاتف المحمول')
translateWeb('.i18n-3', '考点与学校合作', 'Test Centers and School Partnerships', 'Kerjasama dengan Lokasi Ujian dan Sekolah', 'التعاون مع مراكز الاختبار والمدارس')
translateWeb('.i18n-4', '最新资讯', 'Latest Information', 'Informasi Terbaru', 'أحدث المعلومات')
translateWeb('.i18n-5', '常见问题', 'FAQs', 'Pertanyaan Umum', 'الأسئلة الشائعة')
translateWeb('.i18n-6', '考生登入/注册', 'Candidate Login/Register', 'Masuk/Pendaftaran Peserta Ujian', 'تسجيل الطلاب / تسجيل الدخول')
translateWeb('.i18n-7', '合作方登入', 'Partner Login', 'Masuk Mitra', 'تسجيل الشريك')
translateWeb('.i18n-8', '全球唯一HSK口语移动端考试', 'The only HSK Spoken Mobile Test available worldwide', 'Satu-satunya Ujian HSK Lisan Versi Seluler di Dunia', 'اختبار HSK الشفوي للهواتف المحمولة الوحيد في العالم')
translateWeb('.i18n-9', '联系我们: ', 'Contact Us: ', 'Hubungi Kami: ', 'تواصل معنا: ')
translateWeb('.i18n-10', '友情链接: ', 'Friendly Links: ', 'Tautan Sahabat: ', 'روابط صديقة: ')
translateWeb('.i18n-11', '更多质讯: ', 'More Information: ', 'Informasi Lebih Lanjut: ', 'لمزيد من المعلومات: ')
translateWeb('.i18n-12', 'HSK口语移动端考试App下载', 'Download the HSK Spoken Mobile Test App', 'Unduh Aplikasi Ujian HSK Lisan Versi Seluler', 'تنزيل تطبيق اختبار HSK الشفوي للهواتف المحمولة')

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
      $(classname).text(en);
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
    let hash = this.href.split('#')[1];
    this.href = current + queryString + '#' + hash;
  });
}
