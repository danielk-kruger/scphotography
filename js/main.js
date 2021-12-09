window.onload = () => {
  const masonry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    gutter: 5,
    horizontalOrder: true,
    fitWidth: true,
    transitionDuration: 0,
  });
};

AOS.init({
  useClassNames: false,
  easing: 'ease',
  duration: 400,
  once: false,
  offset: -100,
  anchorPlacement: 'top-center',
});

// if (window.innerWidth >= 425) {
//   document.querySelector('.grid-item').setAttribute('data-aos-offset', '-80');
// } else {
//   document.querySelector('.grid-item').setAttribute('data-aos-offset', '-100');
// }

// AOS.refresh();

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
