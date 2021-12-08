const nav = document.querySelector('.navbar');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenu.addEventListener('click', () => {
  const icon = mobileMenu.querySelector('i');
  nav.classList.toggle('mobile');

  if (nav.classList.contains('mobile')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});
