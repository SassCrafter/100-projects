const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const slides = document.querySelectorAll(".slider__slide");
const autoPlayTime = 3000;
let isAutoPlay = true;

const showNextSlide = () => {
  const activeSlide = document.querySelector(".slider__slide.active");
  activeSlide.classList.remove("active");
  let nextSlide = activeSlide.nextElementSibling;
  if (!nextSlide) nextSlide = slides[0];
  nextSlide.classList.add("active");
};

const showPrevSlide = () => {
  const activeSlide = document.querySelector(".slider__slide.active");
  activeSlide.classList.remove("active");
  let prevSlide = activeSlide.previousElementSibling;
  if (!prevSlide) prevSlide = slides[slides.length - 1];
  prevSlide.classList.add("active");
};

const autoPlay = () => {
  if (isAutoPlay) {
    setInterval(showNextSlide, autoPlayTime);
  }
};

nextBtn.addEventListener("click", showNextSlide);
prevBtn.addEventListener("click", showPrevSlide);

autoPlay();
