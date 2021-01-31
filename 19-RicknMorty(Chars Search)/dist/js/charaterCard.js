import Component from "./component.js";
import CardOpen from "./resultCard-open.js";

export default class CharacterCard extends Component {
  constructor(renderId, character) {
    super(renderId);
    this.characterData = character;
    this.render();
  }

  static displayCharacterInfo(characterCard) {
    console.log("displaying");

    const characterInfoCard = new CardOpen("body", characterCard);
  }

  render() {
    const liEl = this.createRootElement("li", "result", [
      { name: "data-id", value: this.characterData.id },
    ]);
    liEl.innerHTML = `
    <div class="result__img">
        <img src="${this.characterData.image}" alt=""/>
    </div>
    <h2 class="result__title">${this.characterData.name}</h2>
    `;
  }
}
