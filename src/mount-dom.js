import { DOM_TYPES } from './h'

export function mountDOM(vdom, parentEl) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl)
      break
    }

    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl)
      break
    }

    case DOM_TYPES.FRAGMENT: {
      createFragmentNodes(vdom, parentEl)
      break
    }

    default: {
      throw new Error(`Can't mount DOM of type: ${vdom.type}`)
    }
  }
}

export function createTextNode(vdom, parentEl){
    const { value } = vdom;
    const textNode = document.createTextNode(value);
    // Save a reference to the real DOM node in the virtual node under the el property
    vdom.el = textNode;
    parentEl.append(textNode);
}

export function createElementNode(vdom, parentEl){
    const { tag, props, children } = vdom;
    const element = document.createElement(tag);
    addProps(element, props, vdom);
    vdom.el = element;

    children.forEach( child => mountDOM(child, element));
    parentEl.append(element);

}

export function createFragmentNodes(vdom, parentEl){
    const { children } = vdom;
    // save the reference of the parent node
    vdom.el = parentEl;

    children.map( (child) => mountDOM(child, parentEl));
}
