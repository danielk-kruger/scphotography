window.onload = () => {
  const masonry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    gutter: 5,
    horizontalOrder: true,
    fitWidth: true,
    transitionDuration: 0,
  });

  if (window.innerWidth >= 1024) {
    masonry.gutter = 1;
    masonry.horizontalOrder = false;
  }
};

AOS.init({
  useClassNames: false,
  easing: 'ease-in-out',
  duration: 400,
  once: false,
  offset: -205,
  anchorPlacement: 'top-center',
});

if (window.innerWidth >= 1024) {
  AOS.init({
    offset: -210,
  });
}

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

const authorContent = document.querySelectorAll('.creator');

window.addEventListener('DOMContentLoaded', () => {
  let index = 0;
  const slides = authorContent;
  const classHide = 'hide',
    count = slides.length;
  nextSlide();

  function nextSlide() {
    slides[index++ % count].classList.add(classHide);
    slides[index % count].classList.remove(classHide);
    setTimeout(nextSlide, 8000);
  }
});
