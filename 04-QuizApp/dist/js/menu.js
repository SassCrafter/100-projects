const menuOptions = document.querySelectorAll(".app__menu__option");
const startBtn = document.querySelector(".btn--start");

const removeClass = (els, className) => {
  els.forEach((el) => el.classList.remove(className));
};

const menuOptionClickHandler = (e) => {
  const target = e.target;
  let optionEl;
  if (!target.classList.contains(".app__menu__option")) {
    optionEl = target.closest(".app__menu__option");
  } else optionEl = target;
  removeClass(menuOptions, "app__menu__option--picked");
  optionEl.classList.add("app__menu__option--picked");
  const href = optionEl.dataset.href;
  startBtn.setAttribute("href", href);
};

menuOptions.forEach((option) => {
  option.addEventListener("click", menuOptionClickHandler);
});
