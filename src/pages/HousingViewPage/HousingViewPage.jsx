import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getHousingById} from "../../http/api/housingAPI.js";
import {Button, Container} from "react-bootstrap";
import './css/housing_view.css'
import useForm from "../../hook/useForm.js";
import {ButtonBack, DropImages, ImageSlider, ListAtrs} from "../../components/index.js";
import {Input, MyButton, MySelect, Textarea} from "../../feutures/index.js";
import {CategoriesModal, TypesModal} from "../../components/Modals/index.js";

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
    categories_d: [],
    tags_d: [],
    images_d: [],
    types_d: [],
}

const HousingViewPage = () => {
    const {id} = useParams()
    const [modalTypesActive, setModalTypesActive] = useState(false)
    const [modalCategoriesActive, setModalCategoriesActive] = useState(false)
    const [images, setImages] = useState([])
    const [categories, setCategories] = useState([])
    const [types, setTypes] = useState([])
    const [tags, setTags] = useState([])

    const validate = (fields = defaultValues) => {
        return true
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(defaultValues, validate)

    useEffect(() => {
        getHousingById(id)
            .then(data => {
                console.log(data)
                defaultValues = data
                setValues(data)
                setImages(data.images_d)
                setTypes(data.types_d)
                console.log(data.types_d)
                setCategories(data.categories_d)
                setTags(data.tags_d)
            })
            .catch(err => {
                console.error(err)
                alert('Не удалось получить жилье\n'+err)
            })
    }, []);

    const openTypeModalHandler = (e) => {
        e.preventDefault()
        setModalTypesActive(true)
    }
    const openCategoriesModalHandler = (e) => {
        e.preventDefault()
        setModalCategoriesActive(true)
    }

    return (
        <Container>
            <ButtonBack className={'btn__back'}>Назад</ButtonBack>
            Страница жилья {id}
            <div className="container_housing">
                <div className="col_images">
                    <div className="carousel">
                        <ImageSlider slides={images}/>
                    </div>
                    <div className="image_picker">
                        <DropImages images={images} setImages={setImages}/>
                    </div>
                </div>
                <div className="col_fields">
                    <div className={'row_body'}>
                        <div className="container_fields">
                            <Input type={'text'} label={'Название'}
                                   name={'name'}
                                   value={values.name} onChange={handleInputChange}
                                   error={errors.name}
                            />
                            <Input type={'text'} label={'Сокращенное название'}
                                   name={'short_name'}
                                   value={values.short_name} onChange={handleInputChange}
                                   error={errors.short_name}
                            />
                            <Input type={'text'} label={'Адрес'}
                                   name={'address'}
                                   value={values.address} onChange={handleInputChange}
                                   error={errors.address}
                            />
                            <Textarea label={'Описание'} rows={3}
                                      name={'description'}
                                      value={values.description} onChange={handleInputChange}
                                      error={errors.description}
                            />
                            <Input type={'number'} label={'Кол-во мест'} min={'0'} pattern={'\d+'}
                                   name={'number_of_seats'}
                                   value={values.number_of_seats} onChange={handleInputChange}
                                   error={errors.number_of_seats}
                            />
                            {/*<MySelect items={countries} label={'Страна'}*/}
                            {/*          name={'country'}*/}
                            {/*          selectValue={values.country} onChange={handleInputChange}*/}
                            {/*          error={errors.country}*/}
                            {/*/>*/}
                        </div>
                        <div className="container_attrs">
                            <ListAtrs items={types} onClick={openTypeModalHandler} label={'Типы'}/>
                            <ListAtrs items={categories} onClick={openCategoriesModalHandler} label={'Катергории'}/>
                        </div>
                    </div>
                    <div className="row_footer">
                        <MyButton>Сохранить</MyButton>
                        <MyButton>Опубликовать</MyButton>
                        <Button variant={'outline-danger'}>Отменить изменения</Button>
                    </div>
                </div>

            </div>

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
    );
};

export default HousingViewPage;