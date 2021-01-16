const hideElements = (...elements) => {
  elements.forEach((el) => (el.hidden = true));
};

const showElements = (...elements) => {
  elements.forEach((el) => (el.hidden = false));
};

const showIncorrectInput = (el, text) => {
  const messageEl = document.createElement("p");
  messageEl.textContent = text;
  messageEl.classList.add("error-text");
  el.appendChild(messageEl);
};
const hideIncorrectInput = (el) => {
  el.remove();
};

const checkInputs = (inputs, message = "Please fill the following input") => {
  let areValid = true;
  for (const input of inputs) {
    const label = input.previousElementSibling;
    if (input.value.trim() === "") {
      areValid = false;
      showIncorrectInput(label, message);
      break;
    }
    if (label.firstElementChild) hideIncorrectInput(label.firstElementChild);
  }
  return areValid;
};

const clearInputs = (inputs) => {
  inputs.forEach((input) => {
    input.value = "";
  });
};

const updateELContent = (el, text) => {
  el.textContent = text;
};

const saveToLocalStorage = (name, object) => {
  localStorage.removeItem(name);
  localStorage.setItem(name, JSON.stringify(object));
};

const loadFromLocalStorage = (name) => {
  if (localStorage.getItem(name) !== null) {
    return JSON.parse(localStorage[name]);
  }
};

const getRand = (min, max) => Math.floor(Math.random() * (max - min) + min);

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

export {
  hideElements,
  showElements,
  checkInputs,
  clearInputs,
  showIncorrectInput,
  saveToLocalStorage,
  loadFromLocalStorage,
  getRand,
  shuffleArray,
};
