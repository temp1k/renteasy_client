import React, {useState} from 'react';
import {Input, MyButton, Textarea} from "../../feutures/index.js";
import {DropImages, ListAtrs} from "../../components/index.js";
import {Container} from "react-bootstrap";
import './css/housingcreate.css'
import {CategoriesModal, TypesModal} from "../../components/Modals/index.js";
import {createHousingAPI} from "./api/housingCreateAPI.js";

let defaultValues = {
    name: '',
    short_name: '',
    address: '',
    number_of_seats: 0,
    description: '',
    country: 1,
    rating: 0,
    categories: [],
    tags: [],
    images: [],
    types: [],
}

const HousingCreatePage = () => {
    const [images, setImages] = useState([])

    const [types, setTypes] = useState([])
    const [modalTypesActive, setModalTypesActive] = useState(false)

    const [categories, setCategories] = useState([])
    const [modalCategoriesActive, setModalCategoriesActive] = useState(false)


    const [tags, setTags] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault()

        createHousingAPI(defaultValues)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const openTypeModalHandle = (e) => {
        e.preventDefault()
        setModalTypesActive(true)
    }

    const openCategoriesModalHandle = (e) => {
        e.preventDefault()
        setModalCategoriesActive(true)
    }

    return (
        <div>
            <h4>Создание жилья</h4>
            <Container>
                <form className={'form__create__housing'} onSubmit={handleSubmit}>
                    <div className="container__fields">
                        <Input type={'text'} label={'Название'}/>
                        <Input type={'text'} label={'Сокращенное название'}/>
                        <Input type={'text'} label={'Адрес'}/>
                        <Textarea label={'Описание'} rows={3}/>
                        <Input type={'number'} label={'Кол-во мест'} min={'0'} pattern={'\d+'} />
                    </div>
                    <div className="container__images">
                        <DropImages images={images} setImages={setImages}/>
                    </div>
                    <div className="container__atrs">
                        <ListAtrs items={types} onClick={openTypeModalHandle} label={'Типы:'}/>
                        <ListAtrs items={categories} onClick={openCategoriesModalHandle} label={'Категории:'}/>
                    </div>
                    <div className="container__footer">
                        <MyButton type={'submit'}>Сохранить</MyButton>
                    </div>
                </form>

                <TypesModal
                    active={modalTypesActive} setActive={setModalTypesActive}
                    label={'Выберите типы жилья'}
                    selectedTypes={types} setSelectedTypes={setTypes}
                />
                <CategoriesModal
                    active={modalCategoriesActive} setActive={setModalCategoriesActive}
                    label={'Выбор категории'}
                    selectedCategories={categories} setSelectedCategories={setCategories}
                />
            </Container>
        </div>
    );
};

export default HousingCreatePage;