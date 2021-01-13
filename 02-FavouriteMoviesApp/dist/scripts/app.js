const startAddMovieBtn = document.getElementById("add-movie");
const addMovieModalEl = document.getElementById("add-modal");
const backDropEl = document.getElementById("backdrop");
const cancelBtn = addMovieModalEl.querySelector(".btn--passive");
const addMovieBtn = addMovieModalEl.querySelector(".btn--success");
const addMovieInputs = addMovieModalEl.querySelectorAll("input");
const titleInput = document.getElementById("title");
const imgInput = document.getElementById("image-url");
const ratingInput = document.getElementById("rating");
const entryTextEl = document.getElementById("entry-text");
const deleteModalEl = document.getElementById("delete-modal");
const saveToLSBtn = document.getElementById("save");
const loadFromLSBtn = document.getElementById("load");

let movies = [];

let movieIdCounter = 0;

const toggleEntryText = () => {
  if (movies.length === 0) {
    entryTextEl.hidden = false;
  } else {
    entryTextEl.hidden = true;
  }
};

const clearInputs = (inputs) => {
  for (const input of inputs) {
    input.value = "";
  }
};

const checkInputs = (inputs) => {
  let isValidValue = true;
  for (const input of inputs) {
    if (
      input.value.trim() === "" ||
      +ratingInput.value > 5 ||
      +ratingInput.value < 1
    ) {
      isValidValue = false;
      break;
    }
  }
  return isValidValue;
};

const toggleBackDrop = () => {
  backDropEl.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModalEl.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModalEl.classList.add("visible");
  toggleBackDrop();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackDrop();
  clearInputs(addMovieInputs);
};

const createMovieObject = (id, title, img, rating) => {
  return { id: id, title: title, img: img, rating: rating };
};

const closeMovieDeletionHandler = () => {
  toggleBackDrop();
  deleteModalEl.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  const movie = document.getElementById(`${movieId}`);
  movie.remove();
  //movies.splice(movies.indexOf(movie), 1);
  const index = movies.findIndex((el) => el.id === movieId);
  movies.splice(index, 1);
  closeMovieDeletionHandler();
  toggleEntryText();
};

const deleteMovieHandler = (movieId) => {
  toggleBackDrop();
  deleteModalEl.classList.add("visible");
  const cancelDeletionBtn = deleteModalEl.querySelector(".btn--passive");
  let confirmDeletionBtn = deleteModalEl.querySelector(".btn--danger");

  cancelDeletionBtn.removeEventListener("click", closeMovieDeletionHandler);
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteModalEl.querySelector(".btn--danger");

  cancelDeletionBtn.addEventListener("click", closeMovieDeletionHandler);
  confirmDeletionBtn.addEventListener("click", deleteMovie.bind(null, movieId));
};

const createMovieEl = (id, title, img, rating) => {
  const movieEl = document.createElement("li");
  movieEl.classList.add("movie-element");
  movieEl.id = id;
  movieEl.addEventListener("click", deleteMovieHandler.bind(null, id));
  movieEl.innerHTML = `
    <div class="movie-element__image">
        <img src="${img}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
  `;
  const moviesList = document.getElementById("movie-list");
  moviesList.appendChild(movieEl);
};

const addMovieHandler = () => {
  if (checkInputs(addMovieInputs)) {
    const title = titleInput.value;
    const imgUrl = imgInput.value;
    const rating = ratingInput.value;
    createMovieEl(movieIdCounter, title, imgUrl, rating);
    movies.push(createMovieObject(movieIdCounter, title, imgUrl, rating));
    console.log(movies);
    closeMovieModal();
    toggleBackDrop();
    toggleEntryText();
    clearInputs(addMovieInputs);
    movieIdCounter++;
  } else console.log("Bad");
};

const saveToLSHandler = () => {
  localStorage.removeItem("savedMoviesList");
  localStorage.setItem("savedMoviesList", JSON.stringify(movies));
};

const loadSavedMoviesList = () => {
  if (localStorage.getItem("savedMoviesList") !== null) {
    movies = JSON.parse(localStorage.savedMoviesList);
    movies.forEach((movie) => {
      createMovieEl(movie.id, movie.title, movie.img, movie.rating);
    });
    toggleEntryText();
  }
};

const backDropHandler = () => {
  closeMovieModal();
  closeMovieDeletionHandler();
  //deleteModalEl.classList.remove("visible");
};

startAddMovieBtn.addEventListener("click", showMovieModal);

backDropEl.addEventListener("click", backDropHandler);

cancelBtn.addEventListener("click", cancelAddMovieHandler);

addMovieBtn.addEventListener("click", addMovieHandler);

saveToLSBtn.addEventListener("click", saveToLSHandler);
loadFromLSBtn.addEventListener("click", loadSavedMoviesList);
