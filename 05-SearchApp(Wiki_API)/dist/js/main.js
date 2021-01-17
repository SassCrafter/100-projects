import {
  setSearchFocus,
  showClearBtn,
  clearSearchInputHandler,
  clearPushListener,
} from "./searchBar.js";
import {
  deleteSearchResuls,
  buildSearchResults,
  setStatesLine,
  clearStatesLine,
} from "./searchResults.js";
import { getSearchTerm, getSearchResult } from "./dataFunctions.js";

const processTheSearch = async () => {
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await getSearchResult(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStatesLine(resultArray);
};

const submitSearchFormHandler = (e) => {
  e.preventDefault();
  clearStatesLine();
  deleteSearchResuls();
  processTheSearch();
  setSearchFocus();
};

const initApp = () => {
  setSearchFocus();
  // TODO: 3 Listeners clear text
  const search = document.getElementById("search");
  search.addEventListener("input", showClearBtn);
  const clearBtn = document.getElementById("clear");
  clearBtn.addEventListener("click", clearSearchInputHandler);
  clearBtn.addEventListener("keydown", clearPushListener);
  const form = document.getElementById("search-bar");
  form.addEventListener("submit", submitSearchFormHandler);
};

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    initApp();
  }
});
