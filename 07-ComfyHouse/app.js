// Variables

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// Cart
let cart = [];

// Getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      const rawProducts = data.items;
      const products = rawProducts.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const img = item.fields.image.fields.file.url;
        return { id, title, img, price };
      });
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}

// Display Products
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
        <article class="product">
            <div class="img-container">
            <img
                src="${product.img}"
                alt="product 1"
                class="product-img"
            />
            <button class="bag-btn" data-id="${product.id}">
                <i class="fas fa-shopping-cart"></i>
                add to cart
            </button>
            </div>
            <h3>${product.title}</h3>
            <h4>\$${product.price}</h4>
        </article>
        `;
    });
    productsDOM.innerHTML = result;
  }
}

// Local Storage
class Storage {
  static saveProduct(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

const ui = new UI();
const products = new Products();
products.getProducts().then((products) => {
  ui.displayProducts(products);
  Storage.saveProduct(products);
});
