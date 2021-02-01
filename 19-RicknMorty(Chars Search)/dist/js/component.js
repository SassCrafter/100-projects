export default class Component {
  constructor(hookId) {
    this.hookId = hookId;
  }

  createRootElement(tag, classNames, attr, beforeElId) {
    const rootEl = document.createElement(tag);
    if (classNames) rootEl.className = classNames;
    if (attr) {
      attr.forEach((attr) => {
        rootEl.setAttribute(attr.name, attr.value);
      });
    }
    if (beforeElId) {
      document.getElementById(this.hookId).insertBefore(rootEl, document.getElementById(beforeElId));
    } else {
      document.getElementById(this.hookId).appendChild(rootEl);
    }
    return rootEl;
  }

  animateRootEl(el, className, time) {
    setTimeout(() => {
      el.classList.add(className);
    }, time);
  }
  removeRootEl(el, time) {
    setTimeout(() => {
      el.remove();
    }, time);
  }
}
