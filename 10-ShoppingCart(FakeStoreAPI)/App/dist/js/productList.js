import { Product } from "./product.js";
import { Component } from "./helperClasses.js";

class ProductList extends Component {
  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.getProducts();
  }

  async getProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    this.products = await response.json();
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.products) {
      new Product("products", prod);
    }
  }

  render() {
    this.createRootELement("div", "products container flex flex-ai-s", [
      {
        name: "id",
        value: "products",
      },
    ]);
    if (this.products) this.renderProducts();
  }
}

export { ProductList };
