import React, { PureComponent } from "react";

import ConstructorBtn from 'components/ConstructorBtn'
import SwitchSlider from 'components/SwitchSlider'
import Check from 'components/Checkbox'

class Cont extends PureComponent {
    constructor(props) {
        super(props);
        this.toggleCheck = this.toggleCheck.bind(this)
    }

    toggleCheck(path, value){
        this.props.stateUpdater([path], !value)
    }

    render() {

        const setting_rateable = this.props.settingRateable
        const setting_commentable  = this.props.settingCommentable
        const isFormValid = this.props.isFormValid

        return (
            <>
                <div className='content-box'>
                    <div className='instruction'>

                        <span>В первый раз на сайте или забыли, как пользоваться формой создания рецепта? Тогда посмотрите инструкцию.</span>
                        <div className='separation-line' />
                        <ConstructorBtn 
                            className='submit-btn' 
                            text='инструкция' 
                            isActive
                        />
                        
                    </div>
                </div>

                <div className='content-box'>
                    
                    <div className='preview'>
                        <div className='slider-container'>
                            <span className='toggle-label'>Включен</span>
                            <SwitchSlider onToggle={this.props.onPreviewToggle}/>
                            <span className='toggle-label'>Выключен</span>
                        </div>

                        <span className='preview-label'>Предварительный просмотр</span>

                        <div className='separation-line'/>

                        <ConstructorBtn 
                            className='draft-btn' 
                            text="В ЧЕРНОВИК" 
                            icon='&#xea22;' 
                            onClick={this.props.onDraftSubmit}
                        />

                        <span className='draft-label'>Если Вы не готовы выложить рецепт, хотите его дополнить позже, сохраните черновик.</span>
                    </div>
                
                </div>

                <div className="content-box">
                    <div className='publish'>

                        <div className='checkboxes'>
                            <Check
                                className='bold-label' 
                                isActive={setting_commentable}
                                text='Получать комментарии и оценки от пользователей'
                                stateUpdater={this.toggleCheck}
                                elemId='setting_commentable'
                            />
                            <Check
                                className='bold-label' 
                                isActive={setting_rateable}
                                text='Участвует в голосовании?'
                                stateUpdater={this.toggleCheck}
                                elemId='setting_rateable'
                            />
                        </div>

                        <div className='separation-line'/>

                        <div className='publish-button'>
                            <ConstructorBtn 
                                className='submit-btn' 
                                text='опубликовать' 
                                isActive={isFormValid} 
                                onClick={this.props.onSubmit}
                            />
                            <span className='publish-button__label'>Рецепт будет опубликован после прохождения модерации. Время модерации с 9 до 21 по Москве.</span>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}
export default Cont;
