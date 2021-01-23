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

class Shop {
  constructor() {
    this.render();
  }

  render() {
    new ProductList("products-section");
  }
}

class App {
  static init() {
    const shop = new Shop();
  }
}

App.init();
