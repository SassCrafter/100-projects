import { Component } from "./helperClasses.js";
import { RecipeItem } from "./recipe.js";

export class RecipeList extends Component {
  searchString;
  recipes = [];
  recipesEls = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.render();
  }

  set searchString(value) {
    this.searchString = value;
  }

  convertSearchString(str) {
    return str.replace(/ /g, "_");
  }

  clearRecipes() {
    const r = document.querySelectorAll(".recipe");
    if (r) {
      r.forEach((el) => el.remove());
    }
    this.recipes = [];
  }

  toggleLoading() {
    const loader = document.getElementById("recipes-loader");
    loader.classList.toggle("hidden");
  }

  async getsRecipes() {
    if (this.searchString) {
      this.clearRecipes();
      this.toggleLoading();
      const nameRequestString = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.searchString}`;
      const ingredientRequestString = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.convertSearchString(
        this.searchString
      )}`;
      await this.fetchRecipes(nameRequestString);
      await this.fetchRecipes(ingredientRequestString);
      this.toggleLoading();
      document.getElementById(
        "recipes-text"
      ).textContent = `Found ${this.recipes.length} recipes`;
      if (this.recipes) {
        this.recipes.forEach((recipe) => {
          this.recipesEls.push(new RecipeItem("recipes-list", recipe));
        });
      }
    }
  }

  async fetchRecipes(searchStr) {
    const response = await fetch(searchStr);
    const recipesArr = await response.json();
    if (recipesArr.meals) {
      this.recipes.push(...recipesArr.meals);
    }
    console.log(this.recipes);
  }

  render() {
    const listEl = this.createRootElement("ul", "recipes__list", [
      { name: "id", value: "recipes-list" },
    ]);
  }
}
