import Component from "./component.js";
import CharacterCard from "./charaterCard.js";
import { getRandomNumber } from "./helperFunctions.js";

export default class CharacterList extends Component {
  searchString = "https://rickandmortyapi.com/api/character/";
  charactersList = [];
  constructor(hookId) {
    super(hookId);
    this.render();
    this.getRandomCharacters(10);
  }

  getRandomNums(quantity) {
    const randomNumArr = [];
    while (randomNumArr.length < quantity) {
      const randomNum = getRandomNumber(0, 600);
      if (!randomNumArr.includes(randomNum)) {
        randomNumArr.push(randomNum);
      }
    }
    return randomNumArr;
  }

  async getRandomCharacters(quantity) {
    const str = this.searchString + this.getRandomNums(quantity);
    this.updateListUI(str);
  }

  async getCharacters(searchStr) {
    try {
      console.log(searchStr);
      const response = await fetch(searchStr);
      if (!response.ok) {
        console.log("error");
        throw new Error("Network response was not ok");
      }
      const charsData = await response.json();
      console.log(charsData);
      return charsData;
    } catch (error) {
      console.log(error);
    }
  }

  async updateListUI(searchStr) {
    this.removeCharacterCards();
    const characters = await this.getCharacters(searchStr);
    if (!characters.results) {
      characters.forEach((char) => {
        this.charactersList.push(new CharacterCard("characters-list", char));
      });
    } else {
      characters.results.forEach((char) => {
        this.charactersList.push(new CharacterCard("characters-list", char));
      });
    }
  }

  removeCharacterCards() {
    const cards = document.querySelectorAll(".result");
    if (cards) {
      cards.forEach((card) => card.remove());
    }
  }

  showCharecterInfo(id) {
    console.log(id);
    const clickedCardData = this.charactersList.find(
      (el) => el.characterData.id === +id
    );
    CharacterCard.displayCharacterInfo(clickedCardData);
    console.log(clickedCardData);
  }

  handleClick(e) {
    const clickedCardId = e.target.closest("li.result").dataset.id;
    this.showCharecterInfo(clickedCardId);
  }

  render() {
    const list = this.createRootElement("ul", "results__list", [
      { name: "id", value: "characters-list" },
    ]);
    list.addEventListener("click", this.handleClick.bind(this));
  }
}
