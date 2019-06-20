import React from "react";
import {sortableElement} from 'react-sortable-hoc';

import DragButton from 'components/DragButton'
import TrashCanButton from 'components/TrashCanButton'

import 'styles/SortDeleteWrapperInline.sass'


function SortDeleteWrapper (props) {
    return (
        <>
            <div key={props.key} className={'sort-delete-wrapper-inline '+props.className}>

                <div className='block-managment'>
                    <DragButton className='drag-button'/>
                    {props.children}
                    <TrashCanButton className='trash-can' onClick={props.onDelete}/>
                </div>

            </div>
        </>
    )
}

export default sortableElement(SortDeleteWrapper);
