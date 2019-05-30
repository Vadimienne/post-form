

export function requestIngredients( str ) {
  return fetch('https://www.edimdoma.ru/retsepty/ingredients/filter?q=' + str)
    .then((response) => response.json())
    .catch((error) => {console.log(error); return 0})
}
