import React, { PureComponent } from "react";
import { sortableElement } from 'react-sortable-hoc';

import DragButton from 'components/DragButton'
import TrashCanButton from 'components/TrashCanButton'

import 'styles/SortDeleteWrapper.sass'


class SortDeleteWrapper extends PureComponent {

    constructor(props){
        super(props)
        this.onDelete = this.onDelete.bind(this)
    }

    onDelete(){
        this.props.onDelete(this.props.index)
    }

    // shouldComponentUpdate(nextProps){
    //     let str = (a) => JSON.stringify(a)
    //     if(str(this.props.children.props.data.toJS()) === str(nextProps.children.props.data.toJS())){
    //         return 0
    //     }
    //     return 1
    // }

    render(){
        const props = this.props
        return (
            <div key={props.key} className={'sort-delete-wrapper '+props.className}>
                <div className='block-managment'>
                    <div className='drag-n-desc'>
                        <DragButton className='drag-button'/>
                        <div className='module-name'>{props.name}</div>
                    </div>
                    <div className='delete-n-desc'>
                        <TrashCanButton className='trash-can' id={'trash-can-btn-' + props.idType + props.index} onClick={this.onDelete}/>
                        {
                            props.deleteDesc
                                ?<label className='delete-desc' htmlFor={'trash-can-btn-' + props.idType + props.index}>{props.deleteDesc}</label>
                                :''
                        }
                    </div>
                </div>
                <div className='module'>{props.children}</div>
            </div>
        )
    }
}

export default sortableElement(SortDeleteWrapper);
