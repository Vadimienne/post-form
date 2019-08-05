// write group ingredients to state
// these ingredients will be passed to steps as available ingredients
import Immutable from 'immutable'

export function updateIngredients(){
    //get all ingredients from groups
    let ingredients = Immutable.List()
    let ingredientGroups = this.state.json.get('ingredient_groups')
    ingredientGroups.map(
        (elem) => ingredients = ingredients.push(
            {
                label: elem.get('element'), 
                value: elem.get('recipe_ingredients')
            }
        )
    )

    // leave only valid ingredients
    ingredients.map(
        (elem) => {
            elem.value = elem.value.filter(
                (ing) => {
                    // filter destroyed and invalid ingredients
                    if ((ing.get('_destroy') == true) || !(ing.get('amount') && ing.get('ingredient_id') && ing.get('unit_id'))) {
                        return false
                    }
                    else {
                        return true
                    }
                    // // delete destroyed ingredients
                    // if(ing.get('_destroy') == true){
                    //     ingredients = ingredients.setIn([groupIndex, 'value', ingIndex, 'invalid'], true)
                    // }

                    // // delete invalid ingredients
                    // if(!(ing.get('amount') && ing.get('ingredient_id') && ing.get('unit_id'))) {
                    //     console.log('DELETING INGREDIENT:', groupIndex, ingIndex)
                    //     ingredients = ingredients.setIn([groupIndex, 'value', ingIndex, 'invalid'], true)
                    // }
                }
            )
        }
    )


    // make array of unique ingredients from steps with usedAmount field
    // which is sum of all amounts of same ingredient
    let steps = this.state.json.get('recipe_steps').toJS()
    let stepIngredients = []
    steps.map(
        elem => elem.step_ingredients.map(
            ing => {
                let duplicateIndex = stepIngredients.findIndex(x => x.recipe_ingredient_id == ing.recipe_ingredient_id)
                if ( duplicateIndex == -1 ){
                    let newIngredient = Object.assign({}, ing, {usedAmount: (parseFloat(ing.amount) ? parseFloat(ing.amount) : 0)})
                    // console.log('ING AMOUNT',ing.amount)
                    stepIngredients.push(newIngredient)
                }
                else {
                    stepIngredients[duplicateIndex].usedAmount += (parseFloat(ing.amount) ? parseFloat(ing.amount) : 0)
                }
            }
        )
    )
    
    // pass usedAmount to ingredients
    ingredients.map(
        (elem, groupIndex) => {
            elem.value.map(
                (ing, ingIndex) => {
                    let id = ing.get('id')
                    let foundInSteps = stepIngredients.find( x => x.recipe_ingredient_id == id)
                    ingredients = ingredients.setIn([groupIndex, 'value', ingIndex, 'usedAmount'], 
                        foundInSteps ? foundInSteps.usedAmount: 0)
                }
            )
        }
    )

    this.setState({ingredients})
}