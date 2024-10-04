// document api addEventListener(type, listener)

export function addEventListener(eventname, handler, el){
    el.addEventListener(eventname, handler);
    return handler
}

export function addEventListeners(listeners = {}, el){
    // Need this when components have their own state
    const addedListeners = {}

    Object.entries(listeners).forEach( ([eventName, handler]) => {
        const listener = addEventListener(eventName, handler, el);
        addedListeners[eventName] = listener;
    })
}