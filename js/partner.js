$('#partner-menu-btn').addClass('active');

$('#partner-contact-us').on('click', function() {
  document.getElementById('partner-contact-us-form').scrollIntoView({ behavior: 'smooth' });
});

$('.toast').toast('show');