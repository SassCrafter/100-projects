import {RecipeList} from './recipeList.js';
import {SearchBar} from './searchBar.js';
import {headerScrollHandler} from './header.js';


export class App {
  static init() {
    this.recipeList = new RecipeList('recipes-container');
    this.searchBar = new SearchBar();
  }

  static searchRecipe() {
    this.recipeList.searchString = this.searchBar.searchString;
    this.recipeList.getsRecipes();
  }
}


App.init();


window.addEventListener('scroll', headerScrollHandler);

