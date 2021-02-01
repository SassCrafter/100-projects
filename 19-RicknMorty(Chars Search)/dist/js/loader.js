import Component from './component.js';

export default class Loader extends Component {
    constructor(hookId) {
        super(hookId);
        this.render();
    }

    render() {
        this.loaderEl = this.createRootElement('section', 'loader', [], 'search-results');
        this.loaderEl.innerHTML = `
        <section class="loader" id="loader">
            <div class="loader__circle"></div>
        </section>
        `;
        this.animateRootEl(this.loaderEl, 'visible', 100);
    }
}   