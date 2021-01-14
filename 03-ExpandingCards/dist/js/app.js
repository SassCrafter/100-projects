const cards = document.querySelectorAll(".card");

const cardClickHandler = (e) => {
  const target = e.target;
  cards.forEach((card) => {
    card.classList.remove("card--expand");
  });
  target.classList.add("card--expand");
};

cards.forEach((card) => {
  card.addEventListener("click", cardClickHandler);
});
