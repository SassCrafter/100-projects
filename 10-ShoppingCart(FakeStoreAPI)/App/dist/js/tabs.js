import { Component } from "./helperClasses.js";
class Tabs extends Component {
  constructor(renderHookId) {
    super(renderHookId);
    this.render();
  }

  static toggleTabStyle(tab) {
    const activeTab = document.querySelector(".tabs__item.active");
    activeTab.classList.remove("active");
    tab.classList.add("active");
  }

  toggleTabs() {
    const productType = this.dataset.tab;
    const products = document.querySelectorAll(".product");
    Tabs.toggleTabStyle(this);
    if (productType === "all") {
      products.forEach((p) => p.classList.remove("hidden"));
    } else {
      products.forEach((p) => {
        if (p.dataset.tab !== productType) {
          p.classList.add("hidden");
        } else {
          p.classList.remove("hidden");
        }
      });
    }
  }

  render() {
    const tabsEl = this.createRootELement("div", "tabs flex flex--jc-sb");
    tabsEl.innerHTML = `
    <button class="tabs__item active" data-tab='all'>all</button>
    <button class="tabs__item" data-tab='clothing'>Clothes</button>
    <button class="tabs__item" data-tab='jewelery'>Jewelery</button>
    <button class="tabs__item" data-tab='electronics'>Electronics</button>
    `;
    const tabs = document.querySelectorAll("button[data-tab]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", this.toggleTabs);
    });
  }
}

export { Tabs };
