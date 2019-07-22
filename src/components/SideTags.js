import React, { PureComponent } from "react";

import CollapsibleCheckboxes from 'components/CollapsibleCheckboxes'
import DoubleSelect from 'components/DoubleSelect'
import CategorySelect from 'components/CategorySelect'

import 'styles/SideTags.sass'

class SideTags extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {

        const {
            category,
            subcategories,
            cookingMethods,
            cuisine,
            cuisineApps,
            cuisineTypes,
            holidays,
            mealtimes,
            nutritionTypes,
            userTags,
            contest,
            contestId
        } = this.props

        const { tags, contests } = this.props

        this.props.checked
        console.log('this.props.checked: ', tags.recipe_holiday, tags.recipe_cuisine, contests);

        return (
            <div className='side-tags'>
                <div className='content-box'>
                    <div className='content-box__content'>
                        <DoubleSelect
                            header='Опубликовать в категории' 
                            isValid={this.props.isCategoryValid}
                            category={category}  
                            subcategories={subcategories} 
                            categoryScaffold={tags.recipe_category}
                            stateUpdater={this.props.stateUpdater}
                        />
                    </div>
                </div>

                <div className='content-box'>
                    <div className='content-box__content'>
                        {/* if contest is selected, pass only this contest as Select value*/}
                        {/* otherwise pass all available contests */}
                        <CategorySelect
                            header='Рецепт для конкурса' 
                            categoryScaffold={contestId? [{
                                name: contest.get('title'), 
                                id: contest.get('id')}]
                                : contests}
                            selectedCategory={contestId}
                            
                            stateUpdater={this.props.stateUpdater}
                            updatePath='contest_id'
                        />
                    </div>
                </div>

                <div className='content-box'>
                    <div className='content-box__content'>
                        <CategorySelect
                            header='Национальная кухня' 
                            isValid={this.props.isCuisineValid}
                            categoryScaffold={tags.recipe_cuisine} 
                            selectedCategory={cuisine}
                            stateUpdater={this.props.stateUpdater}
                            updatePath='recipe_cuisine'
                        />

                        <div className='separation-line' />

                        <CollapsibleCheckboxes
                            head='Методы приготовления'
                            tags={tags.recipe_cooking_method} 
                            checked={cookingMethods} 
                            stateUpdater={this.props.stateUpdater}
                            updatePath='recipe_cooking_methods'

                        />

                        <div className='separation-line' />

                        <CollapsibleCheckboxes
                            head='Кухонная техника'
                            tags={tags.recipe_cuisine_app} 
                            checked={cuisineApps} 
                            stateUpdater={this.props.stateUpdater}
                            updatePath='recipe_cuisine_apps'
                        />
                    </div>
                </div>

                <div className='content-box'>
                    <div className='content-box__content'>
                        <CollapsibleCheckboxes
                            head='Тип питания'
                            tags={tags.recipe_nutrition_type} 
                            checked={nutritionTypes}
                            stateUpdater={this.props.stateUpdater}
                            updatePath='recipe_nutrition_types'
                        />

                        <div className='separation-line' />

                        <CollapsibleCheckboxes
                            head='Время приема пищи'
                            tags={tags.recipe_mealtime} 
                            checked={mealtimes}
                            stateUpdater={this.props.stateUpdater}
                            updatePath='recipe_mealtimes'
                        />
                    </div>
                </div>

                <div className='content-box'>
                    <div className='content-box__content'>
                        <CategorySelect
                            header='Рецепт для праздника' 
                            isMulti={true} 
                            categoryScaffold={tags.recipe_holiday} 
                            selectedCategory={holidays}
                            stateUpdater={this.props.stateUpdater}
                            updatePath='recipe_holidays'
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default SideTags;
