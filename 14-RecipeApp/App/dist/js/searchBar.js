import { App } from './app.js';

export class SearchBar {
    constructor() {
        this.form = document.getElementById('search-form');
        this.form.addEventListener('submit', this.searchHandler.bind(this));
    }

    searchHandler(e) {
        e.preventDefault();
        const searchInput = this.form.querySelector('#search-recipe');
        this.searchString = searchInput.value;
        console.log('searching')
        App.searchRecipe();
        searchInput.value = '';
    }

}