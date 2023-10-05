$('#partner-menu-btn').addClass('active');

$('#partner-contact-us').on('click', function() {
  $('#partner-contact-us-form')[0].scrollIntoView({ behavior: 'smooth' });
});

$('.toast').toast('show');