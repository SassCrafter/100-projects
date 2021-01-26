import { RecipeList } from "./recipeList.js";
import { SearchBar } from "./searchBar.js";
import { headerScrollHandler, toggleHeaderButtons } from "./header.js";
import { RecipeExpanded } from "./recipeExpanded.js";

export class App {
  static init() {
    this.recipeList = new RecipeList("recipes-container");
    this.searchBar = new SearchBar();
  }

  static searchRecipe() {
    this.recipeList.searchString = this.searchBar.searchString;
    this.recipeList.getsRecipes();
  }

  static recipeExpand(id) {
    this.recipeExpanded = new RecipeExpanded(
      "body",
      this.recipeList.recipes[id]
    );
    toggleHeaderButtons();
    console.log(this.recipeList.recipes[id].strMeal);
  }
}

App.init();

window.addEventListener("scroll", headerScrollHandler);
