import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MyModal from "../MyModal.jsx";
import {MinHousingCard} from "../../MinHousingCard/index.js";
import {Input, MyButton} from "../../../feutures/index.js";
import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './pubhousing_modal.css'
import useFormatDate from "../../../hook/useFormatDate.js";
import {createPublishHousingAPI} from "../../../http/api/publishHousingAPI.js";

const PublishHousingModal = ({active, setActive, housing, ...props}) => {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;
    const formatStartDate = useFormatDate(startDate)
    const formatEndDate = useFormatDate(endDate)

    const [price, setPrice] = useState(0)

    const validate = () => {
        return true
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!validate()) return
        const formDate = new FormData()
        formDate.append('housing', housing.id)
        formDate.append('date_begin', startDate.toJSON())
        formDate.append('date_end', endDate.toJSON())
        formDate.append('price', price)
        formDate.append('currency', 1)
        formDate.append('activity', true)


        createPublishHousingAPI(formDate)
            .then(data => {
                console.log(data)
                alert('Жилье успешно опубликовано')
                handleCancel()
            })
            .catch(err => {
                console.error(err)
                alert('Ошибка публикации жилья')
            })
    }

    const resetForm = () => {
        setDateRange([new Date(), new Date()])
        setPrice(0)
    }

    const handleCancel = () => {
        resetForm()
        setActive(false)
    }

    return (
        <Modal show={active} onHide={() => setActive(false)}>
            <div className="container_modal">
                <p className={'modal__header'}>Публикация жилья</p>
                <div className={'container_about_housing'}>
                    <p className={'container__header'}>Запись публикации:</p>
                    <MinHousingCard housing={housing} />
                </div>
                <form onSubmit={handleSubmit}>
                    <label className={'fs-16 fw-bold no-margin no-padding'}>Выберите даты:</label>
                    <div className="container_dates">
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            onChange={(update) => {
                                setDateRange(update);
                                console.log(startDate)
                                console.log(endDate)
                            }}
                            isClearable={true}
                            dateFormat='dd/MM/yyyy'
                            inline
                        />
                        <div className="result_dates">
                            <div>С {formatStartDate}</div>
                            <div>По {formatEndDate}</div>
                        </div>
                    </div>
                    <div className="container__fields">
                        <div className="group__field">
                            <label>Цена за одно место: </label>
                            <input type={'number'} min={'0'} pattern={'\d+'}
                                   name={'price'}
                                   value={price} onChange={(e) => setPrice(e.target.value)}/>
                            <span className={'currency'}> руб.</span>
                        </div>
                    </div>
                    <div className="modal__footer">
                        <MyButton type={'submit'}>Опубликовать</MyButton>
                        <Button variant={'danger'} onClick={handleCancel}>Отмена</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

PublishHousingModal.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
    housing: PropTypes.object,
};

export default PublishHousingModal;