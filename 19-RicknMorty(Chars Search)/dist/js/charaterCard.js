import Component from "./component.js";

export default class CharacterCard extends Component {
  constructor(renderId, character) {
    super(renderId);
    this.characterData = character;
    console.log(this.characterData);
    this.render();
  }

  render() {
    const liEl = this.createRootElement("li", "result");
    liEl.innerHTML = `
    <div class="result__img">
        <img src="${this.characterData.image}" alt=""/>
    </div>
    <h2 class="result__title">${this.characterData.name}</h2>
    `;
  }
}
