const backdropEl = document.getElementById("backdrop");
const newQuizSettingsModal = document.getElementById("new-quiz-settings");
const newQuizConfirmSettingsBtn = document.getElementById("confirm-settings");
const quizSettingsForm = document.getElementById("quiz-settings-form");
const currentQuestionCounterEl = document.getElementById(
  "current-question-counter"
);
//const numOfQuestionsEl = document.getElementById("num-of-questions");

let questionCounter = 0;

const hideBackdrop = () => {
  backdropEl.hidden = true;
};

const hideModal = (modal) => {
  modal.hidden = true;
};

const backdropHandler = () => {
  toggleBackdrop();
  hideModal(newQuizSettingsModal);
};

const checkInputs = (inputs) => {
  let areValid = true;
  for (const input of inputs) {
    if (input.value.trim() === "") {
      areValid = false;
      input.previousElementSibling.classList.add("label--error");
      input.classList.add("form__group__input--error");
      console.log(input.previousElementSibling);
      break;
    }
  }
  return areValid;
};

const updateQuestionCounters = (value) => {
  currentQuestionCounterEl.textContent = `${questionCounter}/${value}`;
};

const quizSettingsSubmitHandler = (e) => {
  e.preventDefault();
  const inputs = quizSettingsForm.querySelectorAll(".form__group__input");
  const areInputsValid = checkInputs(inputs);
  if (areInputsValid) {
    hideBackdrop();
    hideModal(newQuizSettingsModal);
    updateQuestionCounters(inputs[0].value);
  }
};

quizSettingsForm.addEventListener("submit", quizSettingsSubmitHandler);

//backdropEl.addEventListener("click", backdropHandler);
