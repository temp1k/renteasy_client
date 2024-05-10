import React, {useEffect, useState} from 'react';
import {CenterLoading, CustomCheckBox, MessageAlert, MyButton} from "../../feutures/index.js";
import {useParams} from "react-router-dom";
import {getAnyHousingByIdAPI, updatePublishHousingAPI} from "../../http/api/publishHousingAPI.js";
import {ButtonBack, MinHousingCard} from "../../components/index.js";
import DatePicker from "react-datepicker";
import {Button} from "react-bootstrap";
import useFormatDate from "../../hook/useFormatDate.js";
import './publish_housing_view.css'
import useForm from "../../hook/useForm.js";

let defaultValues = {
    date_begin: new Date(),
    date_end: new Date(),
    price: 0,
    activity: false,
}

const PublishHousingViewPage = props => {
    const [loading, setLoading] = useState(true)
    const [loadingBnt, setLoadingBtn] = useState(false)
    const [publishHousing, setPublishHousing] = useState({})

    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;
    const formatStartDate = useFormatDate(startDate)
    const formatEndDate = useFormatDate(endDate)

    const {id} = useParams()


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('price' in fieldValues) {
            temp.price = fieldValues.price > 0 ? "" : "Цена должна быть больше 0"
        }
        if ('date_begin' in fieldValues) {
            temp.date = values.date_begin < values.date_end ? "" : "Начальная дата должна быть меньше конечной"
        }

        if (fieldValues === values)
            setErrors({
                ...temp
            });

        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
        resetForm
    } = useForm(defaultValues, validate)

    const resetFullForm = () => {
        resetForm()
        setDateRange([new Date(defaultValues.date_begin), new Date(defaultValues.date_end)])
    }


    useEffect(() => {
        setLoading(true)
        getAnyHousingByIdAPI(id)
            .then(data => {
                console.log(data)
                fillForm(data)
            })
            .catch(err => {
                console.warn(err)
                alert('Ошибка загрузки.\nНе удалось загрузить запись')
                setLoading(false)
            })
    }, []);


    const fillForm = (data) => {
        setPublishHousing(data)
        defaultValues = data
        setDateRange([new Date(data.date_begin), new Date(data.date_end)])
        setLoading(false)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        setLoadingBtn(true)
        const formDate = new FormData()
        formDate.append('housing', publishHousing.housing)
        formDate.append('date_begin', startDate.toJSON())
        formDate.append('date_end', endDate.toJSON())
        formDate.append('price', values.price)
        formDate.append('currency', values.currency)
        formDate.append('activity', values.activity)


        updatePublishHousingAPI(id, formDate)
            .then(data => {
                console.log(data)
                MessageAlert('Публикация успешно изменена')
                setLoadingBtn(false)
                defaultValues = data
            })
            .catch(err => {
                console.error(err)
                setLoadingBtn(false)
                alert('Ошибка изменения публикации жилья')
            })
    }

    const onChangeSelect = () => {
        const fieldValue = {activity: !values.activity}
        setValues({
            ...values, ...fieldValue
        })
    }

    if (!loading) return (
        <div className="container__ph__view">
            <ButtonBack className={'btn__back'}>Назад</ButtonBack>
            <p className={'label__page'}>Изменение публикации</p>
            <div className={'container_about_housing'}>
                <MinHousingCard housing={publishHousing.housing_d} haveImage={true}/>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={'label__dates'}>Выберите даты:</div>
                <div className="container_dates">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
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
                        <div>С <span className="date_str">{formatStartDate}</span> По <span className="date_str">{formatEndDate}</span></div>
                    </div>
                </div>
                <div className="container__fields">
                    <div className="group__field">
                        <label>Цена за одно место: </label>
                        <input type={'number'} min={'0'} pattern={'\d+'}
                               name={'price'}
                               value={values.price} onChange={handleInputChange}/>
                        <span className={'currency'}> {publishHousing.currency_d.publish_name}.</span>
                    </div>
                    <div className="group__field">
                        <CustomCheckBox value={values.activity}
                                        onChange={onChangeSelect}
                                        label={'Активность:'}
                                        yes={'активен'}
                                        no={'не активен'}
                        />
                    </div>
                </div>
                <div className="container__buttons">
                    <MyButton type={'submit'} loading={loadingBnt}>Изменить</MyButton>
                    <Button variant={'outline-danger'} type={'button'} onClick={resetFullForm}>Отменить</Button>
                    {/*<Button variant={'danger'} onClick={handleCancel}>Отмена</Button>*/}
                </div>
            </form>
        </div>
    );
    else {
        return (
            <div className="h-100">
                <CenterLoading />
            </div>
        )
    }
};

PublishHousingViewPage.propTypes = {

};

export default PublishHousingViewPage;