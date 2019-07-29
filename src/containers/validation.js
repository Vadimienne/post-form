export function validate ({title, recipe_category, recipe_cuisine, cooking_time, servings, ingredients, recipe_steps}){
    // let validation = {
    //     title:              title ? true: false,
    //     category:           recipe_category ? (recipe_category.toString().length? true: false) : false,
    //     national_cuisine:   recipe_cuisine? (recipe_cuisine.toString().length? true: false): false,
    //     timing:             parseInt(cooking_time, 10)? true: false,
    //     servings:           parseInt(servings, 10)? true: false,
    //     ingredients:        this.state.ingredients && this.state.ingredients.size ? (this.state.ingredients.toJS().find(elem => elem.value.length == 0)? false: true) : false,
    //     step:               recipe_steps ? (recipe_steps.size? true: false) : false,
    //     steps_description:  recipe_steps ? (recipe_steps.toJS().find((elem) => elem.body && elem.body.length === 0)? false: true) : false,
    // }

    let validation = {}

    validation.title = title ? true: false

    validation.category = recipe_category ? (recipe_category.toString().length? true: false) : false

    validation.national_cuisine = recipe_cuisine? (recipe_cuisine.toString().length? true: false): false

    validation.timing = parseInt(cooking_time, 10)? true: false

    validation.servings = parseInt(servings, 10)? true: false

    if (ingredients && ingredients.size){

        validation.groupNames = ingredients.toJS().find(elem => !elem.label) ? false : true

        console.log(1)
        if (ingredients.toJS().find(elem => elem.value.length == 0)){
            console.log(2)
            validation.ingredients = false
        }
        else {
            console.log(3)
            let isThereInvalidIngredient = true
            ingredients.toJS().map(group => {isThereInvalidIngredient = group.value.find(elem => (!elem.ingredient_id || !elem.amount || !elem.unit_id))})
            console.log('isThereInvalid', isThereInvalidIngredient)
            console.log(ingredients.toJS()[0].value[0])
            if(isThereInvalidIngredient){
                console.log(4)
                validation.ingredients = false
            }
            else{
                console.log(5)
                validation.ingredients = true
            }
        }
    }
    else {
        console.log(6)
        validation.ingredients = false
    }

    // validation.groupNames = 

    // validation.ingredients = this.state.ingredients && this.state.ingredients.size ?
    //     (this.state.ingredients.toJS().find(elem => elem.value.length == 0)? false: true) : false

    validation.step = recipe_steps ? (recipe_steps.find(elem => elem.get('_destroy') !== true)? true: false) : false

    validation.steps_description = recipe_steps ? (recipe_steps.toJS().find((elem) => elem.body && elem.body.length !== 0)? true: false) : false

    return validation
}