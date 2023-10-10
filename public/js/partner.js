$('#partner-menu-btn').addClass('active');

$('#partner-contact-us').on('click', function() {
  $('#partner-contact-us-form')[0].scrollIntoView({ behavior: 'smooth' });
});

$('.toast').toast('show');

dashboardPage()

function dashboardPage() {
  const page = document.URL.split(/[?#]/)[0].split('/').pop();

  switch(page) {
    case 'candidate-management.html':
      authoriseAccess()
      activeMenuBar('#candidate-management-sidebar', '#candidate-management-footbar')
      activeIndicator('.level-bar-item')
      break;
    case 'support-center.html':
      authoriseAccess()
      activeMenuBar('#support-sidebar', '#support-footbar')
      break;
    case 'faqs.html':
      authoriseAccess()
      activeMenuBar('#faqs-sidebar', '#faqs-footbar')
      break;
    default:
      authoriseAccess()
  }
}

function activeMenuBar(sidebarId, footbarId) {
  $(sidebarId).addClass('active');
  $(footbarId).addClass('active');
}

function activeIndicator(classname) {
  $(classname).on('click', function(event) {
    $(classname).removeClass('active');
    $(this).addClass('active')
  })
}

function authoriseAccess() {
  if (partner == null) window.location.href = window.location.origin + '/partner-login.html'
}