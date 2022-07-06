'use strict';

const slideData = [
  {
    title: `Slide 1`,
  },
  {
    title: `Slide 2`,
  },
  {
    title: `Slide 3`,
  },
  {
    title: `Slide 4`,
  },
  {
    title: `Slide 5`,
  },
  {
    title: `Slide 6`,
  },
  {
    title: `Slide 7`,
  },
  {
    title: `Slide 8`,
  },
  {
    title: `Slide 9`,
  },
  {
    title: `Slide 10`,
  },
  {
    title: `Slide 11`,
  },
  {
    title: `Slide 12`,
  },
];

const slider = document.querySelector('.carousel__slider');

const createSlide = function () {
  slider.innerHTML = '';

  slideData.forEach((entry, i) => {
    const markup = `
    <article class="slide">
      <div class="slide__cover slide__cover--${i + 1}">
        <h2>${entry.title}</h2>
      </div>
    </article>
  `;
    slider.insertAdjacentHTML('beforeend', markup);
  });
};

createSlide();

const slides = document.querySelectorAll('.slide');
const slide = document.querySelector('.slide');
const btns = document.querySelectorAll('.btn');
const larr = document.querySelector('.larr');
const rarr = document.querySelector('.rarr');
let slideGap;
let shownSlides;
let translateAccumulator = 0;

const dynamicSlidesVariables = function () {
  let translate;
  let maxTranslate;

  if (window.innerWidth > 1300) {
    [translate, maxTranslate] = styleSlides(4, 75, 1.6);
  } else if (window.innerWidth <= 1300 && window.innerWidth > 920) {
    [translate, maxTranslate] = styleSlides(3, 75, 1.75);
  } else if (window.innerWidth <= 920 && window.innerWidth > 700) {
    [translate, maxTranslate] = styleSlides(2, 75, 2);
  } else if (window.innerWidth <= 920 && window.innerHeight <= 600) {
    [translate, maxTranslate] = styleSlides(2, 75, 2);
  } else if (window.innerWidth <= 700) {
    [translate, maxTranslate] = styleSlides(3, 31, 1.75);
  }

  return [translate, maxTranslate];
};

const styleSlides = function (shownSlides, slideHeight, slideGap) {
  const slideWidth = (100 - slideGap * (shownSlides + 1)) / shownSlides;

  window.innerWidth > 700 ||
  (window.innerWidth <= 920 && window.innerHeight <= 600)
    ? slides.forEach((slide) => {
        slide.style.width = `${slideWidth}%`;
      })
    : slides.forEach((slide) => {
        slide.style.width = `95%`;
      });

  slides.forEach((slide) => {
    slide.style.height = `${slideHeight}%`;
  });

  const marginTop = mobileFirstChildMargin(slideGap);
  window.innerWidth > 700
    ? (slides[0].style.marginLeft = `${slideGap}%`)
    : (slides[0].style.marginTop = `${marginTop}px`);

  slider.style.gap = `${slideGap}%`;

  return [
    slideGap + slideWidth,
    -(slideGap + slideWidth) * (slideData.length - shownSlides),
  ];
};

const mobileFirstChildMargin = function (slideGap) {
  if (window.innerWidth > 700) return;
  return (slider.clientHeight * slideGap) / 100;
};

let translate = dynamicSlidesVariables()[0];
let maxTranslate = dynamicSlidesVariables()[1];

window.addEventListener('resize', function () {
  dynamicSlidesVariables();
  this.location.reload();
});

const moveCarousel = function (e) {
  let fixedAccumulator = Number(translateAccumulator.toFixed(2));

  if (fixedAccumulator === 0 && e.target.id === 'larr') {
    return;
  } else if (fixedAccumulator === maxTranslate && e.target.id === 'rarr') {
    return;
  }

  if (e.target.id === 'larr') {
    slider.style.transform = `translate${
      window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
    }(${translateAccumulator}%)`;
    translateAccumulator += translate;
  } else if (e.target.id === 'rarr') {
    slider.style.transform = `translate${
      window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
    }(${translateAccumulator}% )`;
    translateAccumulator -= translate;
  }

  slider.style.transform = `translate${
    window.innerWidth >= 701 || window.innerHeight <= 600 ? 'X' : 'Y'
  }(${translateAccumulator}% )`;
};

const noPointerEvents = function () {
  let fixedAccumulator = Number(translateAccumulator.toFixed(2));

  if (fixedAccumulator === 0 || fixedAccumulator === -maxTranslate) {
    btns.forEach(function (i) {
      i.classList.add('btn__no--events');
      setTimeout(function () {
        i.classList.remove('btn__no--events');
      }, 600);
    });
  } else {
    btns.forEach(function (i) {
      i.classList.add('btn__no--events');
      setTimeout(function () {
        i.classList.remove('btn__no--events');
      }, 450);
    });
  }
};

larr.addEventListener('click', (e) => {
  noPointerEvents();
  moveCarousel(e, 'bounceLeft', 'bounceTop');
});

rarr.addEventListener('click', (e) => {
  noPointerEvents();
  moveCarousel(e, 'bounceRight', 'bounceDown');
});
