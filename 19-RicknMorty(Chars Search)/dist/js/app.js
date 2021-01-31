import CharacterList from "./characterList.js";
import SearchBar from "./searchBar.js";

class App {
  static init() {
    const list = new CharacterList("search-results");
    const searchBar = new SearchBar("search-form", list);
  }
}

App.init();
