import CharacterList from "./characterList.js";
import SearchBar from "./searchBar.js";
import Loader from './loader.js';

export default class App {
  static init() {
    this.list = new CharacterList("search-results");
    const searchBar = new SearchBar("search-form", this.list);
  }

  static showLoader() {
    this.loader = new Loader('main-container');
  }
  static removeLoader() {
    this.loader.removeRootEl(this.loader.loaderEl, 100);
  }
}

App.init();
