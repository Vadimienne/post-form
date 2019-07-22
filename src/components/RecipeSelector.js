import React, { PureComponent } from "react";
import DraftCard from 'components/DraftCard'

import htmlToText from 'html-to-text'

import 'styles/RecipeSelector.sass'

class RecipeSelector extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { drafts, onModeration, published } = this.props

        let mappedDrafts = drafts.map((elem, index) => 
            <DraftCard 
                body={htmlToText.fromString(elem.description)}
                title={elem.title}
                imgUrl={elem.image}
                date={elem.updated_at}
                recipeStatus='Черновик'
                onClick={this.props.onClick}
                recipeId={elem.id}
                recipeSlug={elem.slug}
                key={`${elem.status}-card-${index}`}
            />
        )


        let mappedModeration = onModeration.map((elem, index) => 
            <DraftCard 
                body={htmlToText.fromString(elem.description)}
                title={elem.title}
                imgUrl={elem.image}
                date={elem.updated_at}
                recipeStatus='Модерация'
                onClick={this.props.onClick}
                recipeId={elem.id}
                recipeSlug={elem.slug}
                key={`${elem.status}-card-${index}`}
            />
        )

        let mappedPublished = published.map((elem, index) => 
            <DraftCard 
                body={htmlToText.fromString(elem.description)}
                title={elem.title}
                imgUrl={elem.image}
                date={elem.updated_at}
                recipeStatus='Опубликован'
                onClick={this.props.onClick}
                recipeId={elem.id}
                recipeSlug={elem.slug}
                key={`${elem.status}-card-${index}`}
            />
        )


        return (
            <div className='recipe-selector'>
                {mappedDrafts}
                {mappedModeration}
                {mappedPublished}
            </div>
        );
    }
}
export default RecipeSelector;