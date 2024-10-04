import { DOM_TYPES } from './h'
import { setAttributes } from './attributes'
import { addEventListeners } from './events'

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
    // Add attributes & event listeners to the element nodes 
    const element = document.createElement(tag);
    addProps(element, props, vdom);
    vdom.el = element;
    // Mount the children recursively into the element 
    children.forEach( child => mountDOM(child, element));
    parentEl.append(element);

}

export function addProps(el, props, vdom){
    const { on: events, ...attrs} = props
    // Add event listeners
    vdom.listeners = addEventListeners(events, el);
    // Set attributes
    setAttributes(el, attrs)
}

export function createFragmentNodes(vdom, parentEl){
    const { children } = vdom;
    // save the reference of the parent node
    vdom.el = parentEl;

    children.map( (child) => mountDOM(child, parentEl));
}
