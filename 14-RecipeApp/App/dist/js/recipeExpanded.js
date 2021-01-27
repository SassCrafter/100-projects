import { Component } from "./helperClasses.js";

export class RecipeExpanded extends Component {
  constructor(rootElId, recipe) {
    super(rootElId);
    this.recipe = recipe;
    this.render();
  }

  createIngredients(id) {
    const ingredientContainer = document.createElement('div');
    ingredientContainer.className = 'recipe-expanded__ingredients';

    const title = document.createElement('h4');
    title.textContent = 'ingredients';
    ingredientContainer.appendChild(title);

    const ingredientList = document.createElement('ul');
    ingredientList.className = 'container'

    let counter = 1;
    if (this.recipe[`strIngredient${counter}`] === undefined) {
      return
    }

    while(this.recipe[`strIngredient${counter}`] !== '') {
      const li = document.createElement('li');
      li.innerHTML = `
        <h5>${this.recipe[`strIngredient${counter}`]}</h5>
        <p>AMOUNT<span>${this.recipe[`strMeasure${counter}`]}</span></p>
      `;
      console.log(this.recipe[`strIngredient${counter}`]);
      ingredientList.appendChild(li);
      counter++;
    }
    ingredientContainer.appendChild(ingredientList);
    document.getElementById(id).appendChild(ingredientContainer);

    // const el = document.getElementById(id);
    // 
  }

  createInstructions(id) {
    const instructionsContainer = document.createElement('div');
    instructionsContainer.innerHTML = `
    <div class="recipe-expanded__instructions">
      <h4>instructions</h4>
      <p class='instruction'>${this.recipe.strInstructions}</p>
    </div>
  `;

    document.getElementById(id).appendChild(instructionsContainer);
  }

  render() {
    document.querySelector('.recipes').classList.add('shrink');
    const rootEl = this.createRootElement("section", "recipe-expanded");
    rootEl.innerHTML = `
        <div class="hero recipe__hero" style="background-image: url('${this.recipe.strMealThumb}');">
          <div class="hero__content">
            <div class="recipe__top">
              <h3 class="recipe__title recipe-expanded__title">${this.recipe.strMeal}</h3>
            </div>
          </div>
        </div>
        <div class="recipe-expanded__main" id="recipe-expanded-main">
          
        </div>
    `;
    this.createIngredients('recipe-expanded-main');
    this.createInstructions('recipe-expanded-main');
  }
}
