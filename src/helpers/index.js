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
    if(json.ingredient_groups){
        json.ingredient_groups = sortByKey(json.ingredient_groups, 'element_position')

        json.ingredient_groups.map((elem, index) => {
            if(json.ingredient_groups[index].recipe_ingredients){
                json.ingredient_groups[index].recipe_ingredients = sortByKey(elem.recipe_ingredients, 'position')
            }
        })
    }

    


    if(json.recipe_steps){
        json.recipe_steps = sortByKey(json.recipe_steps, 'position')

        json.recipe_steps.map((elem, index) => {
            if(json.recipe_steps[index].step_ingredients){
                json.recipe_steps[index].step_ingredients = sortByKey(elem.step_ingredients, 'position')
            }
        })
    }

    return json
}


export function recipeStatusToText (status) {
    switch (status) {
        case 'draft': 
            return 'Черновик'
        case 'on_moderation':
            return 'На модерации'
        case 'published':
            return 'Опубликован'
        default:
            return 'Рецепт'
    }
}

export function monthFromNum (num) {
    switch (num){
        case 1:
            return 'января'
        case 2:
            return 'февраля'
        case 3:
            return 'марта'
        case 4:
            return 'апреля'
        case 5:
            return 'мая'
        case 6:
            return 'июня'
        case 7:
            return 'июля'
        case 8:
            return 'августа'
        case 9:
            return 'сентября'
        case 10:
            return 'октября'
        case 11:
            return 'ноября'
        case 12:
            return 'декабря'
    }
}

