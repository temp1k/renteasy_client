import React from 'react';
import {LayoutArendaHome} from "./components/index.js";

const ArendaHomePage = () => {
    return (
        <LayoutArendaHome>
            <div className='container__info'>
                <h3>Готовы сдать жилье и начать зарабатывать?</h3>
                <div className="text__level4">Мы не можем спрогнозировать ваш зарабок от аренды вашего жилья. Попробуйте
                    обратиться к специалистам по этому вопросу
                </div>
            </div>
            <div className='container__info'>
                <h3>Преимущества нашего сервиса:</h3>
                <ul className="list">
                    <li className="item__list">
                        <p className='item__header'>Дополнительный доход:</p>
                        <span className="item__text">
                            позволяют вам зарабатывать дополнительные деньги,
                            предоставляя ваше жилье в аренду туристам или другим постояльцам.
                        </span>
                    </li>
                    <li className="item__list">
                        <p className='item__header'>Широкий охват аудитории</p>
                        <span className="item__text">
                            Мы имеем базу пользователей со всего мира, что позволяет привлекать больше потенциальных арендаторов.
                        </span>
                    </li>
                    <li className="item__list">
                        <p className='item__header'>Удобство и безопасность</p>
                        <span className="item__text">
                            Мы предоставляем удобные инструменты для размещения объявлений, взаимодействия с постояльцами, а также обеспечивают некоторый уровень защиты и безопасности для обеих сторон.
                        </span>
                    </li>
                    <li className="item__list"><p className='item__header'>Отзывы и рейтинги</p>
                        <span className="item__text">
                            Пользователи могут оставлять отзывы и оценки после пребывания, что помогает другим потенциальным гостям принять решение о бронировании, а вам — улучшить качество предоставляемых услуг.
                        </span></li>
                    <li className="item__list">
                        <p className='item__header'>Гибкость и контроль</p>
                        <span className="item__text">
                            Вы можете самостоятельно управлять графиком бронирования, ценами и правилами проживания, что дает вам большую гибкость и контроль над процессом сдачи жилья в аренду.
                        </span>
                    </li>
                </ul>
            </div>
        </LayoutArendaHome>
    );
};

export default ArendaHomePage;