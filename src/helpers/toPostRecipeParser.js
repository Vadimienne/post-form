export default function parser(json, tags) {

    // find name in list of objects by id
    function findName(elem, list) {
        let result = list.find((iter) => iter.id === elem)
        return result.name
    }

    // find multiple names in list of objects by id 
    function findNames (idsArray, targetArray){
        let result = []
        idsArray.map((elem) => {
            result.push(
                targetArray.find((iter) => iter.id === elem).name
            )
        })
        return result
    }



    Object.freeze(json)
    Object.freeze(tags)
    let result = {}

    console.log(tags.recipe_user_tag)

    const {
        setting_commentable,
        setting_rateable,
        recipe_category,
        recipe_subcategories,
        recipe_cuisine,
        recipe_user_tags,
        recipe_cuisine_types,
        recipe_cooking_methods,
        recipe_cuisine_apps,
        recipe_nutrition_types,
        recipe_mealtimes, 
        recipe_holidays,
        ingredient_groups,
        recipe_steps
    } = json

    // COPYING EQUAL FIELDS
    let equalFields = [
        'title', 
        'description', 
        'preparation_time', 
        'cooking_time', 
        'servings', 
        'contest_id'
    ]

    equalFields.map((elem) => result[elem] = json[elem])

    // PARSING EVERYTHING ELSE
    // settings
    result.setting_attributes = {
        commentable: setting_commentable,
        rateable:    setting_rateable
    }

    // category
    result.recipe_category_list = findNames([recipe_category], tags.recipe_category)

    // subcategories 
    let subcategories = tags.recipe_category.find((iter) => iter.id === recipe_category).recipe_subcategory

    result.recipe_subcategory_list = findNames(recipe_subcategories, subcategories)

    // cuisine type 
    result.recipe_cuisine_type_list = findNames(recipe_cuisine_types, tags.recipe_cuisine_type)

    // cuisine
    result.recipe_cuisine_list = findNames([recipe_cuisine], tags.recipe_cuisine) 

    // nutrition types
    result.recipe_nutrition_type_list = findNames(recipe_nutrition_types, tags.recipe_nutrition_type)

    // mealtimes
    result.recipe_mealtime_list = findNames(recipe_mealtimes, tags.recipe_mealtime)

    // cooking methods
    result.recipe_cooking_method_list = findNames(recipe_cooking_methods, tags.recipe_cooking_method)

    // cuisine_apps
    result.recipe_cuisine_app_list = findNames(recipe_cuisine_apps, tags.recipe_cuisine_app)

    // holidays
    result.recipe_holiday_list = findNames(recipe_holidays, tags.recipe_holiday)

    // user tags
    // result.recipe_user_tag_list = findNames(recipe_user_tags, tags.recipe_user_tag)



    console.log(result)

    return result

} 