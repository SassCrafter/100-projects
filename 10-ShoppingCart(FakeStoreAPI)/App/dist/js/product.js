import { Component } from "./helperClasses.js";

class Product extends Component {
  constructor(renderHookId, product) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  render() {
    const productItem = this.createRootELement("div", "product");
    productItem.innerHTML = `
        <div class="product__img">
        <img src="${this.product.image}" alt="${this.product.title}">
    </div>
    <div class="product__content">
        <button class="product__btn btn btn--transparent hide-on-mobile">add to cart</button>
        <h4 class="product__title">${this.product.title}</h4>
        <p class="product__price" id="price">\$${this.product.price}</p>
        <button class="btn btn--light hide-on-desktop">add to cart  </button>
    `;
  }
}

export { Product };
