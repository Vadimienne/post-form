import React, { PureComponent } from "react";
import DraftCard from 'components/DraftCard'
import NewRecipeCard from 'components/NewRecipeCard'
import { Link } from 'react-router-dom'
import htmlToText from 'html-to-text'

import { getRecipesByStatus } from 'api/requests'

import 'styles/RecipeSelector.sass'

import LoadingBox from 'components/LoadingBox'

class RecipeSelector extends PureComponent {
    constructor(props) {
        super(props);
        this.state={}
    }

    async componentDidMount(){
        let draftRecipes = await getRecipesByStatus('draft')
        let on_moderation = await getRecipesByStatus('on_moderation')
        let published = await getRecipesByStatus('published') 

        draftRecipes.recipes.sort((a,b) => -(new Date(a.updated_at) - new Date(b.updated_at)))

        this.setState({drafts: draftRecipes.recipes})
        this.setState({onModeration: on_moderation.recipes})
        this.setState({published: published.recipes})
    }

    render() {
        const { drafts, onModeration, published } = this.state

        if (!(drafts && onModeration && published) ) {
            return (
                <div className='recipe-selector-loading'>
                    <div className='content-box-loading'>
                        <LoadingBox height='450px' width='280px' />
                    </div>
                    <div className='content-box-loading'>
                        <LoadingBox height='450px' width='280px' />
                    </div>
                    <div className='content-box-loading'>
                        <LoadingBox height='450px' width='280px' />
                    </div>
                    <div className='content-box-loading'>
                        <LoadingBox height='450px' width='280px' />
                    </div>
                </div>
            )
        }

        let mappedDrafts = drafts.map((elem, index) => 
            <Link to={`/${elem.id}`} key={`${elem.status}-card-${index}`}>
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
            <Link to={`/${elem.id}`} key={`${elem.status}-card-${index}`}>
                <DraftCard 
                    body={htmlToText.fromString(elem.description)}
                    title={elem.title}
                    imgUrl={elem.image}
                    date={elem.updated_at}
                    recipeStatus='Модерация'
                    recipeId={elem.id}
                    recipeSlug={elem.slug}
                    key={`${elem.status}-card-${index}`}
                />
            </Link>
        )

        let mappedPublished = published.map((elem, index) => 
            <Link to={`/${elem.id}`} key={`${elem.status}-card-${index}`}>
                <DraftCard 
                    body={htmlToText.fromString(elem.description)}
                    title={elem.title}
                    imgUrl={elem.image}
                    date={elem.updated_at}
                    recipeStatus='Опубликован'
                    recipeId={elem.id}
                    recipeSlug={elem.slug}
                    key={`${elem.status}-card-${index}`}
                />
            </Link>
        )


        return (
            <div className='recipe-selector'>
                <Link to='/new'>
                    <NewRecipeCard />
                </Link>
                {mappedDrafts}
                {mappedModeration}
                {mappedPublished}
            </div>
        );
    }
}
export default RecipeSelector;