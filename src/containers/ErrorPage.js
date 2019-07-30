import React from 'react';
import 'styles/ErrorPage.sass'
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class ErrorPage extends React.PureComponent {
    constructor(props){
        super(props)
    }

    render() {
        const { code } = this.props
        return (
            <div className="page-404-block">
                <div className="page-404-block__wrapper">
                    <div className="page-404-block__header">{code}</div>
                    <div className="page-404-block__description">
                        { code === 404 &&
                            <> 
                                Такой страницы нет. Вероятно, ссылка, по которой вы сюда попали, <br />
                                устарела, или вы ошиблись, когда набирали адрес.
                            </>
                        }
                        { code === 500 &&
                            <> 
                                Внутренняя системная ошибка
                            </>
                        }            
                    </div>
                    <div className="page-404-block__description">
                        Вы можете перейти к&nbsp; 
                        <Link to="/">выбору рецепта</Link>, 
                        вернуться на <a href="https://edimdoma.ru/">главную</a>, 
                        посмотреть <a href="https://edimdoma.ru/retsepty">рецепты</a>,
                        <br /> пообщаться в&nbsp;<a href="https://edimdoma.ru/club">клубе</a> 
                        или воспользоваться&nbsp; <a href="https://edimdoma.ru/search">поиском</a>.
                    </div>
                </div>
            </div>
        );
    }
}





export default ErrorPage