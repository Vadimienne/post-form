
const apiPath = 'http://stage4.edimdoma.ru'

let headers = {
    'Authorization': 'Basic '+btoa('ed4stage:ed4stage'),
}

function decoratedFetch(url, options){
    return fetch(apiPath + url, Object.assign({}, options, {headers: headers}))
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}

export function getIngredients( str ) {
    return fetch(`https://www.edimdoma.ru/retsepty/ingredients/filter?q=${str}`)
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}

export function getUnits(){
    return fetch(apiPath + '/retsepty/units',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage'),
            })
        })
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}


/* export function getRecipe(id){
    console.log(headers)
    return fetch(apiPath + `/retsepty/${id}`,
        {
            method: 'get',
            headers: headers
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
} */

export function getRecipe(id){
    return decoratedFetch(`/retsepty/${id}`,
        {
            method: 'get',
        }
    )
}

export function getTags(){
    return fetch(apiPath + '/retsepty/tags',
        {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage'),
            })
        })
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
}

export function getContests() {
    return fetch(apiPath + `/retsepty/contests`,
        {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage'),
            })
        })
        .then((response) => response.json())
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