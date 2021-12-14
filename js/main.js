const navMenu = document.querySelector('.navbar-menu');
const nav = document.querySelector('.navbar');
const mobileMenu = document.getElementById('mobileMenu');
const gridGallery = document.querySelector('.grid');
const authorContent = document.querySelector('.authors').children;
const aboutContent = document.querySelector('.authors');

const client = contentful.createClient({
  space: 'zoqrycqrv59z',
  accessToken: '3PL04WHPgmI7ZwK8pTy1ERf8ecaOeBS8ERCrnK7XUQ4',
});

class Content {
  async getGallery() {
    try {
      const galleryContent = await client.getEntries({
        content_type: 'scPhotography',
      });

      let gallery = galleryContent.items;
      // console.log(gallery);
      gallery = gallery.map((item) => {
        const { title, gallery } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        const type = item.fields.image.fields.title;
        return { title, gallery, id, type, image };
      });

      // console.log(gallery.reverse());
      return gallery.reverse();
    } catch (err) {
      console.log(err);
    }
  }
}

class UI {
  displayGalleryContent(contentItems) {
    let res = '';
    contentItems.forEach((item) => {
      res += `
      <div class="grid-item ${item.type}" data-aos="fade-up">
        <img src=${item.image} alt="img" />
      </div>
      `;
    });

    gridGallery.innerHTML = res;
  }
}

// class Storage {
//   static saveContent(content) {
//     localStorage.setItem('content', JSON.stringify(content));
//   }
// }

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
  const content = new Content();
  const ui = new UI();

  content.getGallery().then((item) => {
    ui.displayGalleryContent(item);
    // Storage.saveContent(item);

    // Tile the Gallery Images
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
  });

  // Fading effects
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
