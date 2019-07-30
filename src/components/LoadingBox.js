import React from "react";

import 'styles/LoadingBox.sass'

function Comp (props) {
    return (
        <div className='loading-container' style={{height: props.height, width: props.width ? props.width : undefined}}>
            <div className='loading-box' >
            </div>
        </div>
    )
}

export default Comp;