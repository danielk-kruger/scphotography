const navMenu = document.querySelector('.navbar-menu');
const nav = document.querySelector('.navbar');
const mobileMenu = document.getElementById('mobileMenu');
const gridGallery = document.querySelector('.grid');
const authorContent = document.querySelectorAll('.creator');
const aboutContent = document.querySelector('.authors');

$(document).ready(function () {
  $('.user-review__submit').on('click', function () {
    $('.user-review__form').addClass('active');

    $('.user-review__form').fadeIn('fast', function () {
      $('#form-field').fadeIn('fast');
    });
  });

  $('.close-popup').on('click', function () {
    $('.user-review__form').fadeOut('fast', function () {
      $('#form-field').fadeOut('fast');
      $('.user-review__form').removeClass('active');
    });
  });

  // Accordion menu

  function hideMenuItem(event) {
    if ($(event.target).hasClass('faq-toggle')) {
      if ($(event.target).next().hasClass('hide')) {
        $(event.target)
          .next()
          .slideDown(300, function () {
            $(event.target).next().removeClass('hide');
          });
        $('.last').css('border-radius', '0');
        $(event.target)
          .children('i')
          .first()
          .removeClass('fa-plus')
          .addClass('fa-minus');
      } else {
        $(event.target)
          .next()
          .slideUp(300, function () {
            $(event.target).next().addClass('hide');
          });
        $('.last').css('border-radius', '');

        $(event.target)
          .children('i')
          .first()
          .removeClass('fa-minus')
          .addClass('fa-plus');
      }
    }
  }

  $('.faq-content').on('click', (e) => {
    hideMenuItem(e);
    $('.faq-toggle').toggleClass('selected');
  });

  sliderSettings = {
    item: 10,
    cssEasing: 'cubic-bezier(0.35, 0, 0.35, 1)',
    easing: 'cubic-bezier(0.35, 0, 0.35, 1)',
    speed: 600,
    autoWidth: true,
    pager: true,
    loop: false,
    prevHtml: `<i class="fas fa-chevron-left"></i>`,
    nextHtml: `<i class="fas fa-chevron-right"></i>`,

    responsive: [
      {
        breakpoint: 520,
        settings: {
          item: 3,
          slideMargin: 20,
          easing: 'linear',
          pager: true,
          auto: false,
          controls: false,
        },
      },
    ],
  };

  $('#light-slider').lightSlider(sliderSettings);
  $('#light-slider-2').lightSlider(sliderSettings);
});

function lockScrolling() {
  document.querySelector('body').style.overflow = 'hidden';
}

function unlockScrolling() {
  document.querySelector('body').style.overflow = 'auto';
}

function hideMenu() {
  const icon = mobileMenu.querySelector('i');
  nav.classList.toggle('mobile');

  if (nav.classList.contains('mobile')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    lockScrolling();
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    unlockScrolling();
  }
}

mobileMenu.addEventListener('click', () => {
  hideMenu();
});

window.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    useClassNames: false,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    duration: 600,
    once: false,
    anchorPlacement: 'center',
  });

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

// POPUP elements
