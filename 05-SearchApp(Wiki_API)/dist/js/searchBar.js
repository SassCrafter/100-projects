export const setSearchFocus = () => {
  document.getElementById("search").focus();
};

export const showClearBtn = () => {
  const search = document.getElementById("search");
  const clear = document.getElementById("clear");

  if (search.value.length) {
    clear.classList.add("flex");
  } else {
    clear.classList.remove("flex");
  }
};

export const clearSearchInputHandler = (e) => {
  const search = document.getElementById("search");
  search.value = "";
  showClearBtn();
  setSearchFocus();
};

export const clearPushListener = (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    document.getElementById("clear").click();
  }
};
