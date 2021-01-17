const createResultItem = (result) => {
  const resultItem = document.createElement("li");
  resultItem.className = "resultItem";
  return resultItem;
};

const createResultTitle = (result) => {
  const resultTitle = document.createElement("div");
  resultTitle.className = "resultTitle";
  const resultLink = document.createElement("a");
  resultLink.textContent = result.title;
  resultLink.href = `https://en.wikipedia.org/?curid=${result.id}`;
  resultTitle.appendChild(resultLink);
  return resultTitle;
};

const createResultImg = (result) => {
  const imgContainer = document.createElement("div");
  imgContainer.className = "resultImg";
  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", result.img);
  imgContainer.appendChild(imgEl);
  return imgContainer;
};

const createResultText = (result) => {
  const resultText = document.createElement("div");
  resultText.className = "resultText";
  const resultDesc = document.createElement("p");
  resultDesc.className = "resultDescription";
  resultDesc.textContent = result.text;
  resultText.appendChild(resultDesc);
  return resultText;
};

export const deleteSearchResuls = () => {
  const resultEls = document.querySelectorAll(".resultItem");
  resultEls.forEach((el) => {
    el.remove();
  });
};

export const buildSearchResults = (results) => {
  const searchResultsEl = document.getElementById("searchResults");
  results.forEach((result) => {
    const resultItem = createResultItem(result);
    const resultTitle = createResultTitle(result);
    resultItem.appendChild(resultTitle);
    const resultContent = document.createElement("div");
    resultItem.appendChild(resultContent);
    resultContent.className = "resultContent";
    if (result.img) {
      const resultImg = createResultImg(result);
      resultContent.appendChild(resultImg);
    }
    const resultText = createResultText(result);
    resultContent.appendChild(resultText);
    searchResultsEl.appendChild(resultItem);
  });
};

export const setStatesLine = (results) => {
  const states = document.getElementById("stats");
  states.textContent = results.length
    ? `Displaying ${results.length} results`
    : "Sorry, no results";
};

export const clearStatesLine = () => {
  document.getElementById("stats").textContent = "";
};
