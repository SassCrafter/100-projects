const getMaxChar = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChar;
  if (width < 414) maxChar = 65;
  if (width >= 414 && width < 1400) maxChar = 100;
  if (width >= 1400) maxChar = 130;

  return maxChar;
};

const getWikiSearchString = (term) => {
  const maxChars = getMaxChar();
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${term}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
};

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const processWikiResults = (result) => {
  const resultArray = [];
  Object.keys(result).forEach((key) => {
    const id = key;
    const title = result[key].title;
    const text = result[key].extract;
    const img = result[key].hasOwnProperty("thumbnail")
      ? result[key].thumbnail.source
      : null;

    const item = {
      id,
      title,
      text,
      img,
    };
    resultArray.push(item);
  });
  return resultArray;
};

export const getSearchResult = async (term) => {
  const wikiSearchString = getWikiSearchString(term);
  const wikiSearchResults = await requestData(wikiSearchString);
  let resultArray = [];
  if (wikiSearchResults.hasOwnProperty("query")) {
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }
  return resultArray;
};

export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById("search").value.trim();
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, " ");
  return searchTerm;
};
