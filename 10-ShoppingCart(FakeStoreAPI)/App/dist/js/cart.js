import { Component } from "./helperClasses.js";

class Cart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalPrice;
    this.totalPriceEl.textContent = `\$${this.totalPrice.toFixed(2)}`;
    this.mobileTotalPriceEl.textContent = `\$${this.totalPrice.toFixed(2)}`;
  }

  get totalPrice() {
    console.log(this.items);
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
    console.log(sum);
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cart = this.createRootELement("div", "cart nav__list-link");
    cart.innerHTML = `
            <i class="fas fa-shopping-bag"></i>
            <span class="cart__price" id="price-el">$0.00</span>
        `;
    this.totalPriceEl = document.getElementById("price-el");
    this.mobileTotalPriceEl = document.getElementById("mobile-price-el");
  }
}

export { Cart };
