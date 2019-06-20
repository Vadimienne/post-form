import React from "react";
import 'styles/TrashCanButton.css'

function Comp (props) {
    return (
        <>
            <button id={props.id} type='button' role='button' tabIndex={0} className={'trash-can-btn edimdoma-icons-trashcan ' + props.className} onClick={props.onClick}>&#xea5a;</button>
        </>
    )
}

export default Comp;
