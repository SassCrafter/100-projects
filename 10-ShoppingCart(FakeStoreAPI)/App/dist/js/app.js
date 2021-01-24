// import { getProducts } from "./dataFunctions.js";

// const createProduct = async () => {
//   const products = await getProducts();
//   const filteredProducts = products.filter(
//     (p) => p.category !== "women clothing"
//   );
//   console.log(filteredProducts);
// };

// //createProduct();

import { ProductList } from "./productList.js";
import { Tabs } from "./tabs.js";
import { Cart } from "./cart.js";

class Shop {
  constructor() {
    this.render();
  }

  render() {
    new Tabs("products-section");
    new ProductList("products-section");
    this.cart = new Cart("cart-container");
  }
}

class App {
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

export { App };
