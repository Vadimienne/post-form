import React, { PureComponent } from "react";
import {sortableElement} from 'react-sortable-hoc';

import DragButton from 'components/DragButton'
import TrashCanButton from 'components/TrashCanButton'

import 'styles/SortDeleteWrapperInline.sass'


class SortDeleteWrapper extends PureComponent {

    constructor(props){
        super(props)
        this.onDelete = this.onDelete.bind(this)
    }

    onDelete(){
        this.props.onDelete(this.props.index)
    }

    render(){
        const { className, children, onDelete } = this.props


        return (
            <div className={'sort-delete-wrapper-inline '+className}>

                <div className='block-managment'>
                    <DragButton className='drag-button'/>
                    {children}
                    <TrashCanButton className='trash-can' onClick={this.onDelete}/>
                </div>

            </div>
        )
    }
}

export default sortableElement(SortDeleteWrapper);
