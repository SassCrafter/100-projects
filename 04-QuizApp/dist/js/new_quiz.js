import {
  hideElements,
  showElements,
  checkInputs,
  clearInputs,
  showIncorrectInput,
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./helper_functions.js";

const backdropEl = document.getElementById("backdrop");
const quizSettingsModal = document.getElementById("new-quiz-settings");
const quizSettingsForm = document.getElementById("quiz-settings-form");
const currentQuestionCounterEl = document.getElementById(
  "current-question-counter"
);
const newQuestionForm = document.getElementById("new-question-form");
const loadQuizBtn = document.getElementById("load-quiz");
//const numOfQuestionsEl = document.getElementById("num-of-questions");

let questionCounter = 1;
let maxQuestions = 0;

const questions = [];

const updateQuestionCounters = () => {
  currentQuestionCounterEl.textContent = `${questionCounter}/${maxQuestions}`;
};

const quizSettingsSubmitHandler = (e) => {
  e.preventDefault();
  const inputs = quizSettingsForm.querySelectorAll(".form__group__input");
  const areInputsValid = checkInputs(inputs);
  if (+inputs[0].value <= 0) {
    showIncorrectInput(inputs[0], "Should be greater than 0");
    return;
  }
  if (areInputsValid) {
    // hideEl(backdropEl);
    // hideEl(quizSettingsModal);
    hideElements(backdropEl, quizSettingsModal);
    maxQuestions = inputs[0].value;
    updateQuestionCounters();
  }
};

const newQuestionFormSubmitHandler = (e) => {
  e.preventDefault();
  const inputs = newQuestionForm.querySelectorAll('input[type="text"]');
  const areInputsValid = checkInputs(inputs);
  if (!areInputsValid) return;
  const question = inputs[0].value;
  const correct = inputs[1].value;
  const wrongOne = inputs[2].value;
  const wrongTwo = inputs[3].value;
  const wrongThree = inputs[4].value;
  const questionObject = {
    question,
    correct,
    wrongOne,
    wrongTwo,
    wrongThree,
  };
  questions.push(questionObject);
  console.log(questions);
  clearInputs(inputs);
  questionCounter++;
  if (+questionCounter > +maxQuestions) {
    const completeModal = document.getElementById("complete-quiz");
    hideElements(quizSettingsModal);
    showElements(backdropEl, completeModal);
    saveToLocalStorage("newQuizQuestions", questions);
  } else updateQuestionCounters();
};

quizSettingsForm.addEventListener("submit", quizSettingsSubmitHandler);
newQuestionForm.addEventListener("submit", newQuestionFormSubmitHandler);
//loadQuizBtn.addEventListener("click", loadQuizHandler);

//backdropEl.addEventListener("click", backdropHandler);
