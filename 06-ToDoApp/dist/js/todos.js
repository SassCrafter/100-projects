const createCheckIcon = () => {
  return `<i class="fas fa-check"></i>`;
};

export const countTodos = () => {
  const todos = document.querySelectorAll(
    ".app__todo:not(.app__todo--complete)"
  );
  document.getElementById("todos-num").textContent = todos.length;
};

export const completeTodo = (e) => {
  let todoItem = e.target;
  if (!todoItem.classList.contains("app__todo")) {
    todoItem = todoItem.closest("li");
  }
  todoItem.classList.add("app__todo--complete");
  const checkBtn = todoItem.querySelector("button");
  checkBtn.innerHTML = createCheckIcon();
  countTodos();
};
