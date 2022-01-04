const navMenu = document.querySelector('.navbar-menu');
const nav = document.querySelector('.navbar');
const mobileMenu = document.getElementById('mobileMenu');
const gridGallery = document.querySelector('.grid');
const authorContent = document.querySelectorAll('.creator');
const aboutContent = document.querySelector('.authors');

const uploadBtn = document.getElementById('upload');
const commentField = document.getElementById('user-description');
const nameField = document.querySelector('.user-name__field');
const mailField = document.querySelector('.user-email__field');
const submitReviewBtn = document.querySelector('.user-send__msg');

import { FAQs, userRevs } from './data.js';

$(document).ready(function () {
  // let maxReviews = 5;

  $('.user-review__submit').on('click', () => {
    $('.user-review__form').addClass('active');

    $('.user-review__form').fadeIn('fast', () => {
      $('#form-field').fadeIn('fast');
    });
  });

  $('.close-popup').on('click', function () {
    $('.user-review__form').fadeOut('fast', () => {
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
          .slideDown(300, () => {
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
          .slideUp(300, () => {
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

  let sliderSettings = {
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

function handleUploadedImage() {
  uploadBtn.addEventListener('change', () => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const upload = reader.result;
      localStorage.setItem('uploadData', upload);
    });

    reader.readAsDataURL(uploadBtn.files[0]);
  });
}

function addUserReview(revArr) {
  handleUploadedImage();

  submitReviewBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const fetchImage = localStorage.getItem('uploadData');
    revArr.map((revs) => {
      return {
        ...revs,
        name: nameField.value,
        email: mailField.value,
        com: commentField.value,
        profile: fetchImage,
      };
    });

    localStorage.setItem('userReviews', JSON.stringify(revs));
    console.log(userRevs);
  });
}

function updateReviews(revArr) {
  addUserReview(revArr);

  for (let rev of revArr) {
    let userR = `
    <div class="reviews-card">
      <div class="reviews-card__profile">
        <div class="profile-title">
          <h3>${rev.name}</h3>
        </div>
        <div class="profile-image">
          <img src="${rev.profile}" alt="" />
        </div>
      </div>
      <div class="reviews-card__body">
        <i class="fas fa-quote-left"></i>
        <p>
          ${rev.com}
        </p>
      </div>
    </div>
    `;

    document.querySelector('.reviews').insertAdjacentHTML('beforeend', userR);
  }
}

function updateFAQs(faqArr) {
  for (let item of faqArr) {
    let userQ = `
      <div class="faq-content">
        <div class="faq-content__title faq-toggle ${
          item.id === 0 ? 'first' : ''
        } ${item.id === 4 ? 'last' : ''}">
          <span href="#" class="faq-content__title--text"
            >${item.question}</span
          >
          <i class="fas fa-plus"></i>
        </div>
        <div class="faq-content__acc hide">
          <div class="faq-content__acc--info">
            <p>
              ${item.ans}
            </p>

            <div class="ans-rating">
              <a href="#">Was this answer useful? </a>
              <i class="fas fa-thumbs-up"></i>
              <i class="fas fa-thumbs-down"></i>
            </div>
          </div>
        </div>
      </div>
    `;

    document
      .querySelector('.faq-container')
      .insertAdjacentHTML('beforeend', userQ);
  }
}

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
  updateReviews(userRevs);
  updateFAQs(FAQs);

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
