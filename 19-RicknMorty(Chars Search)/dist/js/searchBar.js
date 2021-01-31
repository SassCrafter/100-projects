export default class SearchBar {
  constructor(id, charList) {
    this.charList = charList;
    this.searchBar = document.getElementById(id);
    this.searchBarInput = this.searchBar.querySelector("#search-input");
    this.clearButton = this.searchBar.querySelector("#clear-search-btn");
    this.setupsearchBarBar();
  }

  submitHandler(e) {
    e.preventDefault();
    const searchTerm = `${
      this.charList.searchString
    }?name=${this.searchBarInput.value.trim()}`;
    this.clearInput();
    console.log(searchTerm);
    this.charList.updateListUI(searchTerm);
  }

  inputHandler(e) {
    const value = e.target.value;
    if (value) {
      this.clearButton.classList.remove("hidden");
    } else {
      this.searchBarclearButton.classList.add("hidden");
    }
  }

  setFocus() {
    this.searchBarInput.focus();
  }

  clearInput() {
    this.searchBarInput.value = "";
    this.setFocus();
    this.clearButton.classList.add("hidden");
  }

  setupsearchBarBar() {
    this.searchBar.addEventListener("submit", this.submitHandler.bind(this));

    this.searchBarInput.addEventListener("input", this.inputHandler.bind(this));

    this.clearButton.addEventListener("click", this.clearInput.bind(this));
    this.clearButton.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.clearInput();
      }
    });
  }
}
