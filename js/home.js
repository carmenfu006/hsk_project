setActiveMenu()

function setActiveMenu() {
  if (window.location.hash === '') {
    $('#home-menu-btn').addClass('active');
  } else if (window.location.hash === '#home-news') {
    $('#news-menu-btn').addClass('active');
  } else if (window.location.hash === '#home-faqs') {
    $('#faqs-menu-btn').addClass('active');
  }
}

$(window).scroll(function() {
  var top_of_home_news = $("#home-news").offset().top;
  var bottom_of_home_news = $("#home-news").offset().top + $("#home-news").outerHeight();
  var top_of_home_faqs = $("#home-faqs").offset().top;
  var bottom_of_home_faqs = $("#home-faqs").offset().top + $("#home-faqs").outerHeight();
  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  var top_of_screen = $(window).scrollTop();

  $('.menu-btn').removeClass('active');

  if ((bottom_of_screen > top_of_home_news) && (top_of_screen < bottom_of_home_news)){
    $("#news-menu-btn").addClass('active');
  } else if ((bottom_of_screen > top_of_home_faqs) && (top_of_screen < bottom_of_home_faqs)) {
    $("#faqs-menu-btn").addClass('active');
  } else {
    $("#home-menu-btn").addClass('active');
  }
});

$('.collapse')
.on('show.bs.collapse', function () {
  $(this)
    .prev('.card-header')
    .find('.fa')
    .removeClass('fa-plus')
    .addClass('fa-minus');
})
.on('hide.bs.collapse', function () {
  $(this)
    .prev('.card-header')
    .find('.fa')
    .removeClass('fa-minus')
    .addClass('fa-plus');
});

$('#more-faq').on('click', function() {
  $(this).remove();
  for (let i = 8; i <= 15; i++) {
    $(`#card-${i}`).removeClass('d-none');
  }
})