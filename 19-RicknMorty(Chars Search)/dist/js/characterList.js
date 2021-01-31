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
    console.log(randomNumArr);
    return randomNumArr;
  }

  async getRandomCharacters(quantity) {
    const str = this.searchString + this.getRandomNums(quantity);
    this.getCharacters(str);
  }

  async getCharacters(searchStr) {
    try {
      const response = await fetch(searchStr);
      if (!response.ok) {
        console.log("error");
        throw new Error("Network response was not ok");
      }
      const charsData = await response.json();
      charsData.forEach((char) => {
        this.charactersList.push(new CharacterCard("characters-list", char));
      });
      console.log(this.charactersList);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const list = this.createRootElement("ul", "results__list", [
      { name: "id", value: "characters-list" },
    ]);
  }
}
