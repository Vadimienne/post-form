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
    console.log('=================================================')
    console.log('im invoked')

    const moving = list.get(oldIndex)
    list = list.delete(oldIndex)
    list = list.insert(newIndex, moving)
    return list
}

function sortByKey(array, key){
    array.sort((a, b) => {
        if ( parseInt(a[key], 10) < parseInt(b[key]) ) {
            return -1
        }
        else{
            return 1
        }
    })
    return array
}

export function sortSortable(json){
    json.ingredient_groups = sortByKey(json.ingredient_groups, 'element_position')

    json.ingredient_groups.map((elem, index) => {
        json.ingredient_groups[index].recipe_ingredients = sortByKey(elem.recipe_ingredients, 'position')
    })

    json.recipe_steps = sortByKey(json.recipe_steps, 'position')

    json.recipe_steps.map((elem, index) => {
        json.recipe_steps[index].step_ingredients = sortByKey(elem.step_ingredients, 'position')
    })

    return json
}