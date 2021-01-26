import {Component} from './helperClasses.js';

export class RecipeItem extends Component {
    constructor(renderHookId, recipe) {
        super(renderHookId);
        this.recipe = recipe;
        this.render();
    }

    render() {
        const resipeEl = this.createRootElement('li', 'recipe');
        resipeEl.style.backgroundImage = `url(${this.recipe.strMealThumb})`;
        resipeEl.innerHTML = `
            <div class="recipe__content flex flex--jc-sb">
                <h2 class="recipe__title">${this.recipe.strMeal}</h2>
                <button class="recipe__like">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        `;

    }
}