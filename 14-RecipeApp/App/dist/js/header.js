const headerScrollHandler = (e) => {
  const header = document.getElementById("header");
  const scrollPos = window.scrollY;
  const headerHeight = header.offsetHeight;

  if (scrollPos > headerHeight) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

const toggleHeaderButtons = () => {
  const hamburger = document.getElementById("hamburger");
  const backBtn = document.getElementById("back-btn");
  hamburger.classList.toggle("hidden");
  backBtn.classList.toggle("hidden");
};

const backButtonHandler = () => {};

export { headerScrollHandler, toggleHeaderButtons };
