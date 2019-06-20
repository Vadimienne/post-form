

export function getIngredients( str ) {
  return fetch(`https://www.edimdoma.ru/retsepty/ingredients/filter?q=${str}`)
    .then((response) => response.json())
    .catch((error) => {console.log(error); return 0})
}

export function getUnits(){
  return fetch('http://stage4.edimdoma.ru/retsepty/units',
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
  return fetch(`http://stage4.edimdoma.ru/retsepty/${  id}`,
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
  return fetch('http://stage4.edimdoma.ru/retsepty/tags',
    {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Basic '+btoa('ed4stage:ed4stage'),
      })
    })
    .then((response) => response.json())
    .catch((error) => {console.log(error); return 0})
}
