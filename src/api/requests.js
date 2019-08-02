
export const apiPath = 'http://stage4.edimdoma.ru'

let headers = {
    'Authorization': 'Basic '+btoa('ed4stage:ed4stage'),
    'cache-control': 'no-cache'
}

function decoratedFetch(url, options){
    return fetch(apiPath + url, Object.assign({}, options, {headers: headers}))
        .then((response) => response)
        .catch((error) => {console.log('error',error); return 0})
}

export function getIngredients( str ) {
    return fetch(apiPath + `/retsepty/ingredients/filter?q=${str}`, 
        {
            headers: headers
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}

export function getUnits(){
    return fetch(apiPath + '/retsepty/units',
        {
            method: 'get',
            headers: headers
        })
        .then((response) => response)
        .catch((error) => {console.log(error); return 0})
}

export function getRecipe(id, slug){
    return decoratedFetch(`/retsepty/${id}-${slug}`,
        {
            method: 'get',
            credentials: 'include',
            headers: headers
        }
    )
}

// status: draft, on_moderation, published
export function getRecipesByStatus(status){
    return fetch(`${apiPath}/users/recipes/${status}`,
        {
            credentials: 'include',
            headers: headers
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}

export function getTags(){
    return fetch(apiPath + '/retsepty/tags',
        {
            method: 'get',
            headers: headers
        })
        .then((response) => response)
        .catch((error) => {console.log(error); return 0})
}

export function getContests() {
    return fetch(apiPath + `/retsepty/contests`,
        {
            method: 'get',
            headers: headers
        })
        .then((response) => response)
        .catch((error) => {console.log(error); return 0})
}

export function createRecipe () {
    return fetch(apiPath + '/retsepty', 
        {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage')
            },
            body: JSON.stringify({recipe: {status: 'draft'}})
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}

export function updateRecipe (id, json) {
    return fetch (apiPath + `/retsepty/${id}`,
        {
            method: 'put',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage')
            },
            body: JSON.stringify(json)
        }
    )
}

export function showPreview (id, json) {
    console.log("I'm makin fetch")
    console.log(JSON.stringify(json))
    return fetch (apiPath + `/retsepty/${id}/preview`,
        {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage')
            },
            body: JSON.stringify(json)
        }
    )
        .then( response => response)
        .catch(error => {console.log(error); return error})
}

export function postImage (id, file) {

    let formData = new FormData()
    formData.append('recipe[image]', file)
    return fetch (apiPath + `/retsepty/${id}/images`,
        {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage')
            },
            body: formData
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}


export function postImageStep (id, stepId, file) {

    let formData = new FormData()
    formData.append('recipe_step[image]', file)

    console.log('fetch ')
    return fetch (apiPath + `/retsepty/${id}/recipe_steps/${stepId}`,
        {
            method: 'put',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage')
            },
            body: formData
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}

