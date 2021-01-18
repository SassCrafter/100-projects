import { completeTodo } from "./todos.js";

const newTodoInput = document.getElementById("new-todo-input");

export const showClearBtn = () => {
  const btn = document.getElementById("clear");
  if (newTodoInput.value.trim() !== "") {
    btn.classList.remove("none");
  } else {
    btn.classList.add("none");
  }
};

export const setNewTodoInputFocus = () => {
  setTimeout(() => {
    newTodoInput.focus();
  }, 410);
};

export const clearNewTodoInput = () => {
  newTodoInput.value = "";
  const inputContainer = document.getElementById("new-todo-section");
  if (inputContainer.classList.contains("visible")) setNewTodoInputFocus();
};

export const clearPushListener = (e) => {
  if (e.key === "Enter" || e.key === " ") {
    clearNewTodoInput();
  }
};

export const createTodoItem = () => {
  const todoItem = document.createElement("li");
  todoItem.className = "app__todo";
  todoItem.addEventListener("click", completeTodo);
  const todoText = document.createElement("p");
  todoText.className = "app__todo__text";
  todoText.textContent = newTodoInput.value;
  const todoButton = document.createElement("button");
  todoButton.className = "app__todo__button";
  todoButton.setAttribute("aria-label", "mark todo as completed");

  todoItem.appendChild(todoText);
  todoItem.appendChild(todoButton);

  document.getElementById("app__todos__list").appendChild(todoItem);
};
