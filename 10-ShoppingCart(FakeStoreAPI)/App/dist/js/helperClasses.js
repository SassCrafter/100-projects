class Component {
  constructor(renderHookId, shouldRender = true) {
    this.renderHookId = renderHookId;
    this.shouldRender = shouldRender;
  }

  createRootELement(tag, classes, attributes) {
    const rootEl = document.createElement(tag);
    if (classes) rootEl.className = classes;
    if (attributes) {
      attributes.forEach((attr) => {
        rootEl.setAttribute(attr.name, attr.value);
      });
    }
    const renderHookEl = document.getElementById(this.renderHookId);
    console.log(this.renderHookId);
    renderHookEl.appendChild(rootEl);
    return rootEl;
  }
}

export { Component };
