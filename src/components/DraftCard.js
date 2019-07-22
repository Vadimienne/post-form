import React from "react";

import { recipeStatusToText, monthFromNum } from 'helpers'
import recipePlaceholder from 'images/recipePlaceholder.png'

import 'styles/DraftCard.sass'

class Comp extends React.PureComponent {

    constructor(props){
        super(props)
        this.onRecipeSelect = this.onRecipeSelect.bind(this)
    }

    onRecipeSelect(){
        this.props.onClick(this.props.recipeId, this.props.recipeSlug)
    }

    render(){

        const {recipeStatus, body, title, date, imgUrl, onClick} = this.props

        let theDate = new Date(date)
        return (
            <div className='draft-card'>
                <div className='draft-card__link-wrapper' onClick={this.onRecipeSelect}>
                    <img className='draft-card__image' src={imgUrl ? imgUrl : recipePlaceholder} />
                    <div className='draft-card__status-badge draft-card__content'>{recipeStatus}</div>
                    <div className='draft-card-height-wrapper' >
                        <p className='draft-card__title draft-card__content'>{title}</p>
                        <p className='draft-card__description draft-card__content'>{body}</p>
                    </div>
                    <time className='draft-card__time draft-card__content'>{theDate.getDate()} {monthFromNum(theDate.getMonth())} {theDate.getFullYear()}</time>
                </div>
            </div>
        )
    }
}

export default Comp;