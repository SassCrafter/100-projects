export default class Component {
  constructor(hookId) {
    this.hookId = hookId;
  }

  createRootElement(tag, classNames, attr) {
    const rootEl = document.createElement(tag);
    if (classNames) rootEl.className = classNames;
    if (attr) {
      attr.forEach((attr) => {
        rootEl.setAttribute(attr.name, attr.value);
      });
    }
    document.getElementById(this.hookId).appendChild(rootEl);
    return rootEl;
  }
}
