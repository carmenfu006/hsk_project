if (window.location.hash === '#home-content') {
  $('#home-menu-btn').addClass('active');
} else if (window.location.hash === '#home-news') {
  $('#news-menu-btn').addClass('active');
} else if (window.location.hash === '#home-faqs') {
  $('#faqs-menu-btn').addClass('active');
}

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