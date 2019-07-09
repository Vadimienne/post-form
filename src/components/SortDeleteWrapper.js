import React, { memo } from "react";
import { sortableElement } from 'react-sortable-hoc';

import DragButton from 'components/DragButton'
import TrashCanButton from 'components/TrashCanButton'

import 'styles/SortDeleteWrapper.sass'


function SortDeleteWrapper (props) {
    return (
        <>
            <div key={props.key} className={'sort-delete-wrapper '+props.className}>
                <div className='block-managment'>
                    <div className='drag-n-desc'>
                        <DragButton className='drag-button'/>
                        <div className='module-name'>{props.name}</div>
                    </div>
                    <div className='delete-n-desc'>
                        <TrashCanButton className='trash-can' id={'trash-can-btn-' + props.idType + props.index} onClick={props.onDelete}/>
                        {
                            props.deleteDesc
                                ?<label className='delete-desc' htmlFor={'trash-can-btn-' + props.idType + props.index}>{props.deleteDesc}</label>
                                :''
                        }
                    </div>
                </div>
                <div className='module'>{props.children}</div>
            </div>
        </>
    )
}

export default memo(sortableElement(SortDeleteWrapper));
