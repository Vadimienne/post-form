import React from "react";

import 'styles/DraftCard.sass'

function Comp (props) {
    return (
        <div className='draft-card'>
            <a className='draft-card__link-wrapper' href='#'>
                <img className='draft-card__image' src='https://e3.edimdoma.ru/data/recipes/0012/8489/128489-ed4_small.jpg?1561147746' />
                <div className='draft-card__status-badge draft-card__content'>На модерации</div>
                <p className='draft-card__title draft-card__content'>Паста болоньезе</p>
                <p className='draft-card__description draft-card__content'>И снова о вкусном. Классика, которая никогда не потеряет актуальности, ведь вы всегда знаете, что приготовить на обед или ужин, если уж совсем ничего в голову не идет. Не требует огромного количества</p>
                <time className='draft-card__time draft-card__content'>25 июня 2019</time>
            </a>
        </div>
    )
}

export default Comp;