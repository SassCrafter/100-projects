import { Component } from "./helperClasses.js";

export class RecipeExpanded extends Component {
  constructor(rootElId, recipe) {
    super(rootElId);
    this.recipe = recipe;
    this.render();
  }

  render() {
    const rootEl = this.createRootElement("div", "recipe--expanded");
    rootEl.innerHTML = `
      <section class="recipe-expanded">
        <div class="hero recipe__hero" style="background-image: url('${this.recipe.strMealThumb}');">
          <div class="hero__content">
            <div class="recipe__top">
              <h3 class="recipe__title recipe__title--exp">${this.recipe.strMeal}</h3>
              <p class="recipe__desc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis,
                in.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
