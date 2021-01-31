import Component from "./component.js";

export default class CardOpen extends Component {
  constructor(renderId, characterData) {
    super(renderId);
    this.characterData = characterData;
    console.log(this.characterData);
    this.render();
    this.toggleScroll();
  }

  toggleScroll() {
    document.body.classList.toggle("no-scroll");
  }

  closeCard() {
    console.log("removing");
    const cardOpenEl = document.querySelector(".result-open");
    cardOpenEl.classList.remove("visible");
    this.toggleScroll();
    setTimeout(() => {
      cardOpenEl.remove();
    }, 300);
  }

  checkCharacterStatus(status) {
    return status === "Alive"
      ? "status--alive"
      : status === "Dead"
      ? "status--dead"
      : "status--unknown";
  }

  render() {
    const {
      name,
      gender,
      image,
      species,
      status,
      location,
    } = this.characterData.characterData;
    const cardOpenEl = this.createRootElement("section", "result-open");
    cardOpenEl.innerHTML = `
      <div class="container">
        <header class="result-open__header">
            <button class="btn btn--back" id="close-btn">
            <i class="fas fa-arrow-left"></i>
            </button>
            <h2>Info</h2>
        </header>
        <div class="result-open__main">
        <div class="result-open__img">
        <img
        src="${image}"
        alt="${name}"
        />
    </div>
    <div class="result-open__content">
        <div>
        <h3>${name}</h3>
        <p class="status ${this.checkCharacterStatus(
          status
        )}" id="status-general">
            <span id="status">${status}</span> <span id="specie">${species}</span>
        </p>
        </div>
        <div>
        <h5>Last known location</h5>
        <h4>${location.name}</h4>
        </div>
        <div>
        <h5>Gender</h5>
        <h4>${gender}</h4>
        </div>
    </div>
        </div>
       </div>
      `;
    setTimeout(() => {
      cardOpenEl.classList.add("visible");
    }, 200);
    // cardOpenEl.addEventListener("click", (e) => {
    //   console.log(e.target);
    // });
    const backBtn = cardOpenEl.querySelector("#close-btn");
    console.log(backBtn);
    backBtn.addEventListener("click", this.closeCard.bind(this));
  }
}
