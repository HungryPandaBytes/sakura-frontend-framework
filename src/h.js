/* 
create a script that creates hypertext
Return a virtual node obj with the passed in tag name, props, children
*/
import { withoutNulls } from './utils/arrays.js'

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment'
}

export function mapTextNodes(children){
    return children.map((child) => 
        typeof(child) === 'string' ? hString(child) : child
    )
}


export function hString(str){
    return {
        type: DOM_TYPES.TEXT,
        value: str
    }
}

/*
Manipulate DOM nodes without affecting the live document
Can be more efficient when adding multiple elements to the DOM
in a single operation
*/
export function hfragment(vNodes){
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes))
    }
}

export function h(tag, props = {}, children = []){
    return {
        tag,
        props, 
        children: mapTextNodes(withoutNulls(children)), // remove null values
        type: DOM_TYPES.ELEMENT
    }
}

export function lipsum(n){
    text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
     nisi ut aliquip ex ea commodo consequat.`

    return hfragment(
        Array(n).fill(h('p', {}, [text]))
    )
}

export function MessageComponent({level, message}){
    return h('div', {class: `message message--${level}`}, [
        h('p', {},[message])
    ])
}