
const apiPath = 'http://stage4.edimdoma.ru'

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


export function getRecipe(id){
    return fetch(apiPath + `/retsepty/${  id}`,
        {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage'),
            })
        }
    )
        .then((response) => response.json())
        .catch((error) => {console.log(error); return 0})
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
