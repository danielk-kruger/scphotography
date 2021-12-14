const navMenu = document.querySelector('.navbar-menu');
const nav = document.querySelector('.navbar');
const mobileMenu = document.getElementById('mobileMenu');
const gridGallery = document.querySelector('.grid');
const authorContent = document.querySelectorAll('.creator');
const aboutContent = document.querySelector('.authors');

window.onload = () => {
  // Tile the Gallery Images
  const masonry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    gutter: 5,
    horizontalOrder: true,
    fitWidth: true,
    transitionDuration: 0,
  });

  if (window.innerWidth >= 1024) {
    masonry.gutter = 5;
    masonry.horizontalOrder = true;
  }

  // Fading effects
  AOS.init({
    useClassNames: false,
    easing: 'ease-in-out',
    duration: 600,
    once: false,
    offset: -205,
    anchorPlacement: 'top-center',
  });
};

function hideMenu() {
  const icon = mobileMenu.querySelector('i');
  nav.classList.toggle('mobile');

  if (nav.classList.contains('mobile')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

mobileMenu.addEventListener('click', () => {
  hideMenu();
});

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth >= 1024) {
    AOS.init({
      offset: -200,
    });
  }

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

  // Close the mobile menu when clicking the links

  navMenu.addEventListener('click', (e) => {
    const mobileIsActive = document.querySelector('.navbar.mobile');

    if (window.innerWidth <= 820 && mobileIsActive) {
      hideMenu();
    }
  });
});
