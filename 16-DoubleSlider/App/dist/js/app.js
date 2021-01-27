const sliderLeftEl = document.getElementById("left-side");
const sliderRightEl = document.getElementById("right-side");

const slides = document.querySelectorAll(".slider__item--left");

const nextBtn = document.getElementById("next-slide");
const prevBtn = document.getElementById("prev-slide");

let counter = 0;

const nextSlideHandler = (e) => {
  counter += 100;
  if (counter > (slides.length - 1) * 100) counter = 0;
  console.log(sliderLeftEl, counter);
  sliderLeftEl.style = `transform: translateY(${counter}%);`;
  sliderRightEl.style = `transform: translateY(${-counter}%);`;
};

const prevSlideHandler = (e) => {
  counter -= 100;
  if (counter < 0) counter = (slides.length - 1) * 100;
  console.log(sliderLeftEl, counter);
  sliderLeftEl.style = `transform: translateY(${counter}%);`;
  sliderRightEl.style = `transform: translateY(-${counter}%);`;
};

nextBtn.addEventListener("click", nextSlideHandler);
prevBtn.addEventListener("click", prevSlideHandler);
