import React, { Component } from "react";

import CollapsibleCheckboxes from 'components/CollapsibleCheckboxes'
import DoubleSelect from 'components/DoubleSelect'
import CategorySelect from 'components/CategorySelect'
import Draft from 'components/DraftCard'

import 'styles/SideTags.sass'

class SideTags extends Component {
    constructor(props) {
        super(props);
    }
  
    shouldComponentUpdate(nextProps){
        if(JSON.stringify(this.props) === JSON.stringify(nextProps)){
            return false
        }
        else {
            return true
        }
    }

    render() {
        const {
            recipe_category,
            recipe_subcategories,
            recipe_cooking_methods,
            recipe_cuisine,
            recipe_cuisine_apps,
            // recipe_cuisine_types,
            recipe_holidays,
            recipe_mealtimes,
            recipe_nutrition_types,
            // recipe_user_tags,
            contest_id,
            contest
        } = this.props.checked

        const { tags, contests } = this.props
        /* contests
        console.log('contests SideTags  : ', contests); */


        return (
            <div className='side-tags'>
                <div className='content-box'>
                    <div className='content-box__content'>
                        <DoubleSelect
                            header='Опубликовать в категории' 
                            isValid={this.props.isCategoryValid}
                            category={recipe_category}  
                            subcategories={recipe_subcategories} 
                            categoryScaffold={tags.recipe_category}
                            onCategoryChange=   {(val, callback) => this.props.stateUpdater('recipe_category', val, callback)}
                            onSubcategoryChange={(val) => this.props.stateUpdater('recipe_subcategories', val)}
                        />
                    </div>
                </div>

                <div className='content-box'>
                    <div className='content-box__content'>
                        {/*if there is a contest selected, there is also contests' description in contest field*/}
                        {/* otherwise all available contests should be passed as select options */}
                        <CategorySelect
                            header='Рецепт для конкурса' 
                            categoryScaffold={contest_id? [{name: contest.title, id: contest.id}]: contests}
                            selectedCategory={contest_id}
                            onChange={(val) => this.props.stateUpdater('recipe_cuisine', val)}
                        />
                    </div>
                </div>

                <div className='content-box'>
                    <div className='content-box__content'>
                        <CategorySelect
                            header='Национальная кухня' isValid={this.props.isCuisineValid}
                            categoryScaffold={tags.recipe_cuisine} selectedCategory={recipe_cuisine}
                            onChange={(val) => this.props.stateUpdater('recipe_cuisine', val)}
                        />
                        <div className='separation-line'></div>
                        <CollapsibleCheckboxes
                            tags={tags.recipe_cooking_method} checked={recipe_cooking_methods} head='Методы приготовления'
                            onChange={(val) => this.props.stateUpdater('recipe_cooking_methods',val)}
                        />
                        <div className='separation-line'></div>
                        <CollapsibleCheckboxes
                            tags={tags.recipe_cuisine_app} checked={recipe_cuisine_apps} head='Кухонная техника'
                            onChange={(val) => this.props.stateUpdater('recipe_cuisine_apps',val)}
                        />
                    </div>
                </div>

                <div className='content-box'>
                    <div className='content-box__content'>
                        <CollapsibleCheckboxes
                            tags={tags.recipe_nutrition_type} checked={recipe_nutrition_types} head='Тип питания'
                            onChange={(val) => this.props.stateUpdater('recipe_nutrition_types',val)}
                        />
                        <div className='separation-line'></div>
                        <CollapsibleCheckboxes
                            tags={tags.recipe_mealtime} checked={recipe_mealtimes} head='Время приема пищи'
                            onChange={(val) => this.props.stateUpdater('recipe_mealtimes',val)}
                        />
                    </div>
                </div>

                <div className='content-box'>
                    <div className='content-box__content'>
                        <CategorySelect
                            header='Рецепт для праздника' isMulti={true} categoryScaffold={tags.recipe_holiday} selectedCategory={recipe_holidays}
                            onChange={(val) => this.props.stateUpdater('recipe_holidays', val)}
                        />
                    </div>
                </div>
                <Draft />
            </div>
        );
    }
}
export default SideTags;
