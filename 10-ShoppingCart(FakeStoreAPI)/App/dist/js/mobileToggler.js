const mobileToggler = document.getElementById("mobile-toggler");
const mobileMenuEl = document.getElementById("mobile-menu");

mobileTogglerClickHandler = () => {
  mobileToggler.classList.toggle("open");
  mobileMenuEl.classList.toggle("open");
};

mobileToggler.addEventListener("click", mobileTogglerClickHandler);
