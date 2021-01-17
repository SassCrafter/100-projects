import {
  hideElements,
  showElements,
  checkInputs,
  clearInputs,
  showIncorrectInput,
  getRand,
  shuffleArray,
} from "./helper_functions.js";

const backdropEl = document.getElementById("backdrop");
const settingsModal = document.getElementById("quiz-settings");
const settingsForm = document.getElementById("quiz-settings-form");
const quizForm = document.getElementById("quiz-form");
const answerElements = document.querySelectorAll(".app__answer");
const answerInputs = document.querySelectorAll(".app__answer-input");
const loaderEl = document.getElementById("question-loading");
const newGameBtn = document.getElementById("new-game-btn");
const winModal = document.getElementById("win-modal");

const categories = {
  geography: "22",
  sports: "21",
  computers: "18",
  history: "23",
  games: "15",
};
let questionsAmount;
let currentQuestion = 0;
let category;
let correctEl;

let correctAnswersCounter = 0;
let isQuizEnd = false;

let questionsArray = [];

const getQuestions = (amount, category) => {
  const API =
    category === "all"
      ? `https://opentdb.com/api.php?amount=${amount}&type=multiple`
      : `https://opentdb.com/api.php?amount=${amount}&category=${categories[category]}&type=multiple`;

  hideElements(backdropEl, settingsModal);
  showElements(loaderEl);
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      questionsArray.push(...data.results);
      updateQuiz();
      hideElements(loaderEl);
    });
};

const updateQuiz = () => {
  const questionObj = questionsArray[currentQuestion];

  const categoryEl = document.getElementById("category-text");
  categoryEl.textContent = questionObj.category;

  const questionEl = document.getElementById("question");
  questionEl.innerHTML = questionObj.question;

  const counterEl = document.getElementById("current-question-counter");

  const answerEls = Array.from(document.querySelectorAll(".app__answer__text"));
  const randNum = getRand(0, 4);
  correctEl = answerEls.splice(randNum, 1);
  correctEl[0].innerHTML = questionObj.correct_answer;
  answerEls.forEach(
    (el, idx) => (el.innerHTML = questionObj.incorrect_answers[idx])
  );
  counterEl.textContent = `${currentQuestion + 1}/${questionsArray.length}`;
};

const settingsFormSubmitHandler = (e) => {
  e.preventDefault();
  const inputs = settingsForm.querySelectorAll(".form__group__input");
  const questionsAmountInput = settingsForm.querySelector(
    "#questions-quantity-input"
  );
  const categoryInput = settingsForm.querySelector(
    ".form__group__input--select"
  );
  const areInputsValid = checkInputs(inputs);
  if (+questionsAmountInput.value > 50 || +questionsAmountInput.value < 1) {
    const label = questionsAmountInput.previousElementSibling;
    showIncorrectInput(label, "Number should be between 1 and 50");
    return;
  }
  if (areInputsValid) {
    questionsAmount = +questionsAmountInput.value;
    category = categoryInput.value.toLowerCase();
    getQuestions(questionsAmount, category);
  }
};

const checkAnswer = () => {
  let isSelected = false;
  for (const input of answerInputs) {
    if (input.checked === true) {
      isSelected = true;
      break;
    }
  }
  return isSelected;
};

const checkIfCorrect = () => {
  let correct;
  for (const input of answerInputs) {
    if (input.checked === true) {
      correct = input;
      break;
    }
  }
  if (correct.id === correctEl[0].id.split("-")[0]) {
    correctAnswersCounter++;
  }
};

const clearAnswerSelection = () => {
  answerInputs.forEach((input) => (input.checked = false));
};

const calcScore = () => {
  return Math.floor((correctAnswersCounter / questionsAmount) * 100);
};

const updateWinModal = () => {
  const correctEl = document.getElementById("correct-text");
  const questionsAmountEl = document.getElementById("amount-text");
  const scoreEl = document.getElementById("score-text");
  correctEl.textContent = correctAnswersCounter;
  questionsAmountEl.textContent = questionsAmount;
  scoreEl.textContent = `${calcScore()}%`;
  showElements(backdropEl, winModal);
};

const reset = () => {
  const inputs = settingsForm.querySelectorAll("input.form__group__input");
  clearInputs(inputs);
  clearAnswerSelection();
  questionsArray = [];
  currentQuestion = 0;
  questionsAmount = 0;
  category = "";
  correctAnswersCounter = 0;
  isQuizEnd = false;
};

const newGameHandler = () => {
  hideElements(winModal);
  showElements(settingsModal);
  reset();
};

const quizFormSubmitHandler = (e) => {
  e.preventDefault();
  const isAnswerPicked = checkAnswer();
  if (isAnswerPicked) currentQuestion++;
  if (+currentQuestion >= +questionsAmount) {
    isQuizEnd = true;
    updateWinModal();
  }
  if (isAnswerPicked && !isQuizEnd) {
    checkAnswer();
    checkIfCorrect();
    clearAnswerSelection();
    updateQuiz();
  }
};

settingsForm.addEventListener("submit", settingsFormSubmitHandler);
quizForm.addEventListener("submit", quizFormSubmitHandler);
newGameBtn.addEventListener("click", newGameHandler);
