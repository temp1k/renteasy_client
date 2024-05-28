import React, {useState} from 'react';
import PropTypes from 'prop-types';
import s from './RentItem.module.css'
import {
    differenceDatesInDays,
    formatJsonDateTo_ddMMyyyy_HHmm,
    formatJsonDateToJsDate
} from "../../../../utils/helpers.js";
import {CustomLinkButton, MyButton} from "../../../../feutures/index.js";
import {MY_REQUESTS_ROUTE} from "../../../../utils/consts/paths.js";
import {FaCheck, FaEye} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import {ConfirmRequestAction} from "../ConfirmRequestAction/index.js";
import {CancelRequestAction} from "../CancelRequestAction/index.js";


const FieldItem = ({text, title, lines=1, ...props}) => {
    return (
        <div
            className={'container_field_item'}
            {...props}
        >
            <p className={'title_field_item'}>{title}</p>
            <p
                className={'text_field_item'}
                style={{WebkitLineClamp: lines, height: `${lines*1.5}em`}}
            >
                {text}
            </p>
        </div>
    )
}

FieldItem.propTypes = {
    text: PropTypes.any,
    title: PropTypes.string,
    lines: PropTypes.number,
}

const RentRequestItem = ({item, updateData, ...props}) => {
    const [request, setRequest] = useState(item)
    let housing = request?.product_d

    let countDays = differenceDatesInDays(formatJsonDateToJsDate(request.date_begin), formatJsonDateToJsDate(request.date_end))

    return (
        <div
            {...props}
            className={s.request_container+' card__border '+props.className}
        >
            <div className={s.card__body}>
                <div>
                    <p className="card__header">{housing.name}</p>
                    <FieldItem
                        text={`${housing.district.name} округ, ${housing.address}`}
                        title={'Адрес:'}
                        lines={2}
                        />
                    <FieldItem
                        text={`${request.number_of_seats}`}
                        title={'Мест:'}
                        lines={1}
                    />
                    <p>
                        <b>Даты: </b>
                        C <span>{formatJsonDateTo_ddMMyyyy_HHmm(request.date_begin)} </span>
                        ПО <span>{formatJsonDateTo_ddMMyyyy_HHmm(request.date_end)}</span>
                    </p>
                    <FieldItem
                        text={countDays}
                        title={'Кол-во дней:'}
                        lines={1}
                    />
                    <FieldItem
                        text={<><span>{request.buyer.username}</span> ({request.buyer.FIO})</>}
                        title={'Арендатор:'}
                        lines={2}
                    />
                    <FieldItem
                        text={request.buyer_confirm & request.owner_confirm ? 'Одобрено' : 'Не одобрено'}
                        title={'Статус:'}
                        lines={1}
                    />
                    <FieldItem
                        text={<>{request.price} {request.product_d.currency_name}</>}
                        title={'Цена:'}
                        lines={1}
                    />
                </div>
                <div className={s.card__footer}>
                    <CustomLinkButton
                        to={request.id.toString()}
                    >
                        <FaEye />
                    </CustomLinkButton>
                    <ConfirmRequestAction successCallback={updateData} requestId={request.id}/>
                    <CancelRequestAction successCallback={updateData} requestId={request.id}/>
                </div>
            </div>
        </div>
    )
}

RentRequestItem.propTypes = {
    item: PropTypes.object,
    className: PropTypes.string,
    updateData: PropTypes.func,
};

export default RentRequestItem;