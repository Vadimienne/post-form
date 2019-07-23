import React, { PureComponent } from "react";
import DraftCard from 'components/DraftCard'
import { Link } from 'react-router-dom'
import htmlToText from 'html-to-text'

import { getRecipesByStatus } from 'api/requests'

import 'styles/RecipeSelector.sass'

class RecipeSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.state={}
    }

    async componentDidMount(){
        const draftRecipes = await getRecipesByStatus('draft')
        const on_moderation = await getRecipesByStatus('on_moderation')
        const published = await getRecipesByStatus('published') 

        this.setState({drafts: draftRecipes.recipes})
        this.setState({onModeration: on_moderation.recipes})
        this.setState({published: published.recipes})
    }

    render() {
        const { drafts, onModeration, published } = this.state

        if (!(drafts && onModeration && published) ) {
            return (
                <div>loading recipes...</div>
            )
        }

        let mappedDrafts = drafts.map((elem, index) => 
            <Link to={`/${elem.id}`}>
                <DraftCard 
                    body={htmlToText.fromString(elem.description)}
                    title={elem.title}
                    imgUrl={elem.image}
                    date={elem.updated_at}
                    recipeStatus='Черновик'
                    recipeId={elem.id}
                    recipeSlug={elem.slug}
                    key={`${elem.status}-card-${index}`}
                />
            </Link>
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