export class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId;
    }

    createRootElement(tag, classes, attributes) {
        const el = document.createElement(tag);
        if (classes) el.className = classes;
        if (attributes) {
            attributes.forEach(attr => {
                el.setAttribute(attr.name, attr.value);
            })
        }
        document.getElementById(this.hookId).appendChild(el);
        return el;
    }
}