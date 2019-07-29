import React, { PureComponent } from "react";

import 'styles/NewRecipeCard.sass'

class Cont extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='new-recipe-card'>
                <span className='new-recipe-card__icon'>&#xea0b;</span>
                <p className='new-recipe-card__title'>Создать новый</p>
            </div>
        );
    }
}
export default Cont;