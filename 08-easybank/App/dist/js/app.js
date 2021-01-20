const mobileMenuToggler = document.querySelector(".header__toggle");
const mobileMenu = document.querySelector(".header__menu");

const toggleMobileMenu = () => {
  mobileMenuToggler.classList.toggle("open");
  mobileMenu.classList.toggle("open");
};

const toggleMenu = (e) => {
  if (e.target.classList.contains("open")) toggleMobileMenu();
};

mobileMenuToggler.addEventListener("click", toggleMobileMenu);
mobileMenu.addEventListener("click", toggleMenu);
