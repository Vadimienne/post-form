import { apiPath } from 'api/requests'

export function createIngredient (recipeId, body) {
    return fetch (apiPath + `/retsepty/${recipeId}/recipe_ingredients`,
        {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage')
            },
            body: JSON.stringify(body)
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}

/* export function updateIngredient (recipeId, ingredientId) {
    return fetch (apiPath + `/retsepty/${recipeId}/recipe_ingredients/${ingredientId}`,
        {
            method: 'put',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage')
            },
            body: JSON.stringify(body)
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}

export function deleteIngredient (recipeId, ingredientId) {
    return fetch (apiPath + `/retsepty/${recipeId}/recipe_ingredients/${ingredientId}`,
        {
            method: 'delete',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage')
            },
            body: JSON.stringify(body)
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0}) 
}
*/