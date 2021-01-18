import { setDate } from "./getCurrentDate.js";
import {
  showClearBtn,
  setNewTodoInputFocus,
  clearNewTodoInput,
  clearPushListener,
  createTodoItem,
} from "./newTodo.js";
import { countTodos } from "./todos.js";

const createNewTodoBtn = document.getElementById("new-todo-button");
const closeCreatingForm = document.getElementById("close-creating-form");
const clearInputBtn = document.getElementById("clear");
const newTodoForm = document.getElementById("new-todo-form");
const newTodoInput = document.getElementById("new-todo-input");

const toggleCreateTodo = () => {
  const createTodoSection = document.getElementById("new-todo-section");
  createTodoSection.classList.toggle("visible");
};

const createNewTodoHandler = () => {
  toggleCreateTodo();
  setNewTodoInputFocus();

  newTodoInput.addEventListener("input", showClearBtn);
  clearInputBtn.addEventListener("click", clearNewTodoInput);
  clearInputBtn.addEventListener("keydown", clearPushListener);
};

const closeCreatingFormHandler = () => {
  toggleCreateTodo();
  clearNewTodoInput();
  showClearBtn();
};

const submitNewTodoFormHandler = (e) => {
  e.preventDefault();
  if (newTodoInput.value.trim() !== "") {
    createTodoItem();
    toggleCreateTodo();
    clearNewTodoInput();
    showClearBtn();
    countTodos();
  }
};

const init = () => {
  setDate();
  countTodos();
};

init();

createNewTodoBtn.addEventListener("click", createNewTodoHandler);
closeCreatingForm.addEventListener("click", closeCreatingFormHandler);
newTodoForm.addEventListener("submit", submitNewTodoFormHandler);
