import React, { PureComponent } from "react";

import 'styles/SwitchSlider.sass'

class Cont extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {isOn: false}
        this.onClick =this.onClick.bind(this)
    }

    // toggle slider and call onClick from props
    onClick(){
        console.log('hey', this.props.onToggle)
        this.props.onToggle ? this.props.onToggle(): null
        this.setState({isOn: !this.state.isOn})
    }

    render() {
        return (
            <div className={"preview-switch" + (this.state.isOn? ' active': '')} onClick={this.onClick}>
                <span className='icon-show'>&#xea43;</span>
                <span className='icon-hide'>&#xea42;</span>
                <div className='slider' />
            </div>
        );
    }
}
export default Cont;
