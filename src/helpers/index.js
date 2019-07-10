import Immutable from "immutable";

/* export function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
} */

export function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = (new Date).getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return fn(...args);
    }
}

export function arrayMoveImmutable(list, oldIndex, newIndex){
    if( !Immutable.isImmutable(list) ) {
        throw "list is not Immutable!"
    }
    else if ( !Immutable.List.isList(list) ){
        throw "list is now Immutable List!"
    }

    const moving = list.get(oldIndex)
    list = list.delete(oldIndex)
    list = list.insert(newIndex, moving)
    return list
}