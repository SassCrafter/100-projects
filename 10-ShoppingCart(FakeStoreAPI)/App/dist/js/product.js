import { Component } from "./helperClasses.js";
import { App } from "./app.js";

class Product extends Component {
  attributes = [];
  clothingCategory = "men clothing";
  jeweleryCategory = "jewelery";
  electronicsCategory = "electronics";
  constructor(renderHookId, product) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addDataAttribute(name, value) {
    this.attributes.push({ name, value });
  }

  chekcProductCategory() {
    if (this.product.category === this.clothingCategory) {
      this.addDataAttribute("data-tab", "clothing");
    } else if (this.product.category === this.jeweleryCategory) {
      this.addDataAttribute("data-tab", "jewelery");
    } else if (this.product.category === this.electronicsCategory) {
      this.addDataAttribute("data-tab", "electronics");
    }
  }

  addToCart() {
    //console.log(this.product);
    App.addProductToCart(this.product);
  }

  render() {
    this.chekcProductCategory();
    const productItem = this.createRootELement(
      "div",
      "product",
      this.attributes
    );
    productItem.innerHTML = `
        <div class="product__img">
          <img src="${this.product.image}" alt="${this.product.title}">
        </div>
        <div class="product__content">
          <h4 class="product__title">${this.product.title}</h4>
          <p class="product__price" id="price">\$${this.product.price}</p>
          <button class="btn btn--light add-to-cart-btn hide-on-desktop">add to cart  </button>
        </div>
        <button class="btn product__btn add-to-cart-btn hide-on-mobile"><i class="fas fa-shopping-cart"></i></button>
    `;
    const addToCartBtns = productItem.querySelectorAll(".add-to-cart-btn");
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", this.addToCart.bind(this));
    });
  }
}

export { Product };
