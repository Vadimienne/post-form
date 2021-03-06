import React, { memo } from "react";

import 'styles/ConstructorBtn.sass'

function RoundBtn (props) {
    return (
        <button
            type='button' role='button' tabIndex={0} className={`round-btn + ${props.className}` + (props.isActive? ' active':'')}
            onClick={props.isActive !== false? props.onClick: undefined}>
            {props.icon && <div className='edimdoma-icon'>{props.icon}</div>}
            <div className='round-btn-text'>{props.text}</div>
        </button>
    )
}

export default memo(RoundBtn);
