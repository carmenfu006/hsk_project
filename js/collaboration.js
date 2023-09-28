$('#collab-menu-btn').addClass('active');

$('#collab-contact-us').on('click', function() {
  document.getElementById('collab-contact-us-form').scrollIntoView({ behavior: 'smooth' });
});

$('.toast').toast('show');