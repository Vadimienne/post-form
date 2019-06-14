import React, { Component } from "react";
import ReactDOM from "react-dom";

import CollapsibleCheckboxes from 'components/CollapsibleCheckboxes'
import DoubleSelect from 'components/DoubleSelect'

class SideTags extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      recipe_category,
      recipe_subcategories,
      recipe_cooking_methods,
      recipe_cuisine,
      recipe_cuisine_apps,
      recipe_cuisine_types,
      recipe_holidays,
      recipe_mealtimes,
      recipe_nutrition_types,
      recipe_user_tags,
    } = this.props.checked

    const { tags } = this.props


    return (
      <>
        <div className='content-box'>
          <div className='content-box__content'>
            <DoubleSelect category={recipe_category}  subcategories={recipe_subcategories} categoryScaffold={tags.recipe_category}
              onCategoryChange={(val)=>this.props.stateUpdater('recipe_category', val)}
              onSubcategoryChange={(val)=>this.props.stateUpdater('recipe_subcategories', val)}
            />
          </div>
        </div>

        <div className='content-box'>
          <div className='content-box__content'>
          </div>
        </div>

        <div className='content-box'>
          <div className='content-box__content'>
            <CollapsibleCheckboxes tags={tags.recipe_cooking_method} checked={recipe_cooking_methods} head='Методы приготовления'/>
            <CollapsibleCheckboxes tags={tags.recipe_cuisine_app} checked={recipe_cuisine_apps} head='Кухонная техника'/>
          </div>
        </div>

        <div className='content-box'>
          <div className='content-box__content'>
            <CollapsibleCheckboxes tags={tags.recipe_nutrition_type} checked={recipe_nutrition_types} head='Тип питания'/>
            <CollapsibleCheckboxes tags={tags.recipe_mealtime} checked={recipe_mealtimes} head='Время приема пищи'/>
          </div>
        </div>

        <div className='content-box'>
          <div className='content-box__content'>
          </div>
        </div>
      </>
    );
  }
}
export default SideTags;
