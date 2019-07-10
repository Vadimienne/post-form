import React, { memo } from "react";
import { sortableHandle } from 'react-sortable-hoc';

import 'styles/DragButton.css'

//sorting via keyboard doesn't work with <button>

function Comp (props) {
    return (
        <>
            <div role='button' tabIndex={0} className={'edimdoma-icon-drag ' + props.className}>&#xea2a;</div>
        </>
    )
}

export default memo(sortableHandle(Comp));
