
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
    return fetch (apiPath + `/retsepty/${125974}/preview`,
        {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                
                'Authorization': 'Basic '+btoa('ed4stage:ed4stage')
            },
            body: JSON.stringify({
              "recipe":{
                "title":"Морские гребешки с пюре из зеленого горошка141",
                "preparation_time":"0",
                "cooking_time":"10",
                "user_id":"403555",
                "servings":"2",
                "views_count":"2430",
                "show_cropper":"0",
                "selected_style":"index",
                "video_original_filename":"",
                "resave":"0",
                "description":"<p>Я решила приготовить блюдо из книги Юлии Высоцкой &laquo;Активное меню&raquo;. Очень приглянулся рецепт морских гребешков со свежим горошком!</p>\r\n",
                "recipe_ingredients_attributes":{
                  "0":{
                    "position":"1",
                    "element_position":"1",
                    "element":"Для пюре",
                    "ingredient_id":"384",
                    "title_show":"",
                    "external_link":"",
                    "amount":"250.0",
                    "unit_id":"4",
                    "_destroy":"false",
                    "id":"783283"
                  },
                  "1":{
                    "position":"2",
                    "element_position":"1",
                    "element":"Для пюре",
                    "ingredient_id":"6617",
                    "title_show":"",
                    "external_link":"",
                    "amount":"100.0",
                    "unit_id":"12",
                    "_destroy":"false",
                    "id":"783284"
                  },
                  "2":{
                    "position":"3",
                    "element_position":"1",
                    "element":"Для пюре",
                    "ingredient_id":"2385",
                    "title_show":"",
                    "external_link":"",
                    "amount":"1.0",
                    "unit_id":"26",
                    "_destroy":"false",
                    "id":"783285"
                  },
                  "3":{
                    "position":"4",
                    "element_position":"1",
                    "element":"Для пюре",
                    "ingredient_id":"49",
                    "title_show":"",
                    "external_link":"",
                    "amount":"1.0",
                    "unit_id":"29",
                    "_destroy":"false",
                    "id":"783286"
                  },
                  "4":{
                    "position":"5",
                    "element_position":"1",
                    "element":"Для пюре",
                    "ingredient_id":"2093",
                    "title_show":"",
                    "external_link":"",
                    "amount":"2.0",
                    "unit_id":"20",
                    "_destroy":"false",
                    "id":"783287"
                  },
                  "5":{
                    "position":"6",
                    "element_position":"2",
                    "element":"Для гребешков",
                    "ingredient_id":"1462",
                    "title_show":"",
                    "external_link":"",
                    "amount":"150.0",
                    "unit_id":"4",
                    "_destroy":"false",
                    "id":"783288"
                  },
                  "6":{
                    "position":"7",
                    "element_position":"2",
                    "element":"Для гребешков",
                    "ingredient_id":"2303",
                    "title_show":"",
                    "external_link":"",
                    "amount":"1.0",
                    "unit_id":"26",
                    "_destroy":"false",
                    "id":"783289"
                  },
                  "7":{
                    "position":"8",
                    "element_position":"2",
                    "element":"Для гребешков",
                    "ingredient_id":"4704",
                    "title_show":"",
                    "external_link":"",
                    "amount":"1.0",
                    "unit_id":"29",
                    "_destroy":"false",
                    "id":"783290"
                  },
                  "8":{
                    "position":"9",
                    "element_position":"2",
                    "element":"Для гребешков",
                    "ingredient_id":"49",
                    "title_show":"",
                    "external_link":"",
                    "amount":"1.0",
                    "unit_id":"29",
                    "_destroy":"false",
                    "id":"783291"
                  },
                  "9":{
                    "position":"10",
                    "element_position":"2",
                    "element":"Для гребешков",
                    "ingredient_id":"2385",
                    "title_show":"",
                    "external_link":"",
                    "amount":"1.0",
                    "unit_id":"26",
                    "_destroy":"false",
                    "id":"783292"
                  },
                  "10":{
                    "position":"11",
                    "element_position":"2",
                    "element":"Для гребешков",
                    "ingredient_id":"139",
                    "title_show":"",
                    "external_link":"",
                    "amount":"2.0",
                    "unit_id":"25",
                    "_destroy":"false",
                    "id":"783293"
                  }
                },
                "recipe_steps_attributes":{
                  "0":{
                    "position":"1",
                    "_destroy":"false",
                    "body":"В кастрюле растопить ложку сливочного масла, добавить горошек, влить горячий бульон, немного посолить и варить 4 минуты. Откинуть на лед.",
                    "step_ingredients_attributes":{
                      "0":{
                        "position":"1",
                        "recipe_ingredient_id":"783283",
                        "amount":"250.0",
                        "_destroy":"false",
                        "id":"3652"
                      },
                      "1":{
                        "position":"2",
                        "recipe_ingredient_id":"783284",
                        "amount":"100.0",
                        "_destroy":"false",
                        "id":"3653"
                      },
                      "2":{
                        "position":"3",
                        "recipe_ingredient_id":"783285",
                        "amount":"1.0",
                        "_destroy":"false",
                        "id":"3654"
                      },
                      "3":{
                        "position":"4",
                        "recipe_ingredient_id":"783286",
                        "amount":"1.0",
                        "_destroy":"false",
                        "id":"3655"
                      }
                    },
                    "id":"601781"
                  },
                  "1":{
                    "position":"2",
                    "_destroy":"false",
                    "body":"Переложить в блендер, добавить мяту.",
                    "step_ingredients_attributes":{
                      "0":{
                        "position":"1",
                        "recipe_ingredient_id":"783287",
                        "amount":"2.0",
                        "_destroy":"false",
                        "id":"3656"
                      }
                    },
                    "id":"601780"
                  },
                  "2":{
                    "position":"3",
                    "_destroy":"false",
                    "body":"Измельчить в однородное пюре.",
                    "id":"601779"
                  },
                  "3":{
                    "position":"4",
                    "_destroy":"false",
                    "body":"В ступке растолочь тмин, соль и перец. Гребешки обвалять в смеси.",
                    "step_ingredients_attributes":{
                      "0":{
                        "position":"1",
                        "recipe_ingredient_id":"783288",
                        "amount":"150.0",
                        "_destroy":"false",
                        "id":"3657"
                      },
                      "1":{
                        "position":"2",
                        "recipe_ingredient_id":"783289",
                        "amount":"1.0",
                        "_destroy":"false",
                        "id":"3658"
                      },
                      "2":{
                        "position":"3",
                        "recipe_ingredient_id":"783291",
                        "amount":"1.0",
                        "_destroy":"false",
                        "id":"3659"
                      },
                      "3":{
                        "position":"4",
                        "recipe_ingredient_id":"783290",
                        "amount":"1.0",
                        "_destroy":"false",
                        "id":"3660"
                      }
                    },
                    "id":"601778"
                  },
                  "4":{
                    "position":"5",
                    "_destroy":"false",
                    "body":"На сковороде растопить ложку сливочного масла, добавить оливковое. Хорошо прогреть.",
                    "step_ingredients_attributes":{
                      "0":{
                        "position":"1",
                        "recipe_ingredient_id":"783292",
                        "amount":"1.0",
                        "_destroy":"false",
                        "id":"3661"
                      },
                      "1":{
                        "position":"2",
                        "recipe_ingredient_id":"783293",
                        "amount":"2.0",
                        "_destroy":"false",
                        "id":"3662"
                      }
                    },
                    "id":"601777"
                  },
                  "5":{
                    "position":"6",
                    "_destroy":"false",
                    "body":"Выложить гребешки.",
                    "id":"601776"
                  },
                  "6":{
                    "position":"7",
                    "_destroy":"false",
                    "body":"Быстро обжарить со всех сторон до румяной корочки.",
                    "id":"601775"
                  },
                  "7":{
                    "position":"8",
                    "_destroy":"false",
                    "body":"Подать гребешки на пюре из горошка.",
                    "id":"601774"
                  },
                  "8":{
                    "position":"9",
                    "_destroy":"false",
                    "body":"Блюдо получилось очень ярким, гармоничным, нежным! Книга понравилась обилием свежих идей сбалансированных, вкусных и полезных блюд!",
                    "id":"601773"
                  }
                },
                "recipe_category_list":"основные блюда",
                "recipe_subcategory_list":[
                  ""
                ],
                "recipe_cuisine_type_list":[
                  ""
                ],
                "recipe_cuisine_list":"итальянская",
                "recipe_nutrition_type_list":[
                  "",
                  "низкокалорийные рецепты",
                  "правильное питание (ЗОЖ)"
                ],
                "recipe_mealtime_list":[
                  "",
                  "обед",
                  "ужин"
                ],
                "recipe_cooking_method_list":[
                  "",
                  "жарить"
                ],
                "recipe_cuisine_app_list":[
                  ""
                ],
                "recipe_holiday_list":[
                  "",
                  "пасха"
                ],
            "admin_form_notified":"1",
                "recipe_user_tag_list":[
                  "",
                  "диетическое меню",
                  "блюда с морепродуктами"
                ],
                "recipe_moderator_tag_list":[
                  "",
                  "морскиегребешки",
                  "зеленыйгорошек",
                  "мята",
                  "пюре",
                  "рецепты юлии высоцкой"
                ],
                "recipe_search_tag_list":[
                  ""
                ],
                "recipe_hidden_tag_list":[
                  ""
                ],
                "recipe_book_list":[
                  "",
                  "активное меню"
                ],
                "recipe_fixed_cuisine_type_list":[
                  ""
                ],
                "recipe_mobile_app_list":"",
                "recipe_app_edimdoma_list":[
                  ""
                ],
                "setting_attributes":{
                  "commentable":"1",
                  "editable":"1",
                  "rateable":"1",
                  "votable":"1",
                  "paid":"0",
                  "rom_category":"rom_unsweet",
                  "id":"129393"
                },
                "attached_contests_attributes":{
                  "0":{
                    "attacherable_id":"201",
                    "attacherable_type":"Contest",
                    "_destroy":"false",
                    "id":"43900"
                  }
                },
                "status":"on_moderation",
                "log_text":""
              },
              "id":"125974-morskie-grebeshki-s-pyure-iz-zelenogo-goroshka"
            })
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

