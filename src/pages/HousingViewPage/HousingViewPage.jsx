import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getHousingById, updateHousingAPI} from "../../http/api/housingAPI.js";
import {Button, Container} from "react-bootstrap";
import './css/housing_view.css'
import useForm from "../../hook/useForm.js";
import {ButtonBack, DropImages, ImageSlider, ListAtrs} from "../../components/index.js";
import {CenterLoading, Input, MyButton, MySelect, Textarea} from "../../feutures/index.js";
import {CategoriesModal, PublishHousingModal, TypesModal} from "../../components/Modals/index.js";
import {remakeArrayOfObjectsToArrayId} from "../../utils/helpers.js";

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
    const [loading, setLoading] = useState(true)

    const {id} = useParams()
    const [modalTypesActive, setModalTypesActive] = useState(false)
    const [modalCategoriesActive, setModalCategoriesActive] = useState(false)
    const [modalPublishActive, setModalPublishActive] = useState(false)
    const [images, setImages] = useState([])
    const [categories, setCategories] = useState([])
    const [types, setTypes] = useState([])
    const [tags, setTags] = useState([])

    const validate = (fieldValues = defaultValues) => {
        let temp = {...errors}
        if ('name' in fieldValues) {
            temp.name = fieldValues.name ? "" : "Название не может быть пустым"
        }
        if ('address' in fieldValues) {
            temp.address = fieldValues.address ? "" : "Адрес не может быть пустым"
        }
        if ('description' in fieldValues) {
            temp.description = fieldValues.description ? "" : "Описание не может быть пустым"
        }
        temp.images = images.length > 0 ? "" : 'Изображения не могут быть пустыми'
        temp.categories = categories.length > 0 ? "" : 'Категории не могут быть пустыми'
        temp.types = types.length ? "" : 'Типы не могут быть пустыми'

        setErrors({...temp});

        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(defaultValues, validate)

    const remakeHousingAPIToHousingObj = (housingAPI) => {
        setValues(housingAPI)
        setImages(housingAPI.images_d)
        setTypes(housingAPI.types_d)
        setCategories(housingAPI.categories_d)
        setTags(housingAPI.tags_d)
    }

    useEffect(() => {
        getHousingById(id)
            .then(data => {
                console.log(data)
                defaultValues = data
                remakeHousingAPIToHousingObj(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                alert('Не удалось получить жилье\n' + err)
                setLoading(false)
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

    const cancelChangesHandle = (e) => {
        e.preventDefault()
        if (!window.confirm('Вы уверены что хотите отменить все изменения?\n' +
            'Все введенные данные будут удалены.')) return

        remakeHousingAPIToHousingObj(defaultValues)
    }

    const handleChangeSubmit = e => {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)

        const formData = new FormData()
        for (let key in values) {
            if (Array.isArray(values[key])) {
                // Если значение является массивом, переберем его и добавим каждый элемент
                values[key].forEach((value) => {
                    formData.append(key, value);
                });
            } else {
                formData.append(key, values[key]);
            }
        }

        let imagesOfIds = remakeArrayOfObjectsToArrayId(images);
        imagesOfIds.forEach((value) => {
            formData.append('images', value);
        });
        let typesOfIds = remakeArrayOfObjectsToArrayId(types);
        typesOfIds.forEach((value) => {
            formData.append('types', value);
        });
        let categoriesOfIds = remakeArrayOfObjectsToArrayId(categories);
        categoriesOfIds.forEach((value) => {
            formData.append('categories', value);
        });

        updateHousingAPI(id, formData)
            .then(data => {
                console.log(data)
                defaultValues = data
                alert('Запись успешно обновлена')
                setLoading(false)
            })
            .catch(err => {
                alert(`Ошибка обновления записи!\n${err}`)
                setLoading(false)
            })
    }

    if (loading) {
        return (
            <div style={{marginTop: '15%'}}>
                <CenterLoading />
            </div>
        )
    }

    return (
        <Container>
            <ButtonBack className={'btn__back'}>Назад</ButtonBack>
            <br/>
            <form onSubmit={handleChangeSubmit}>
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
                            <MyButton type={'submit'}>Сохранить</MyButton>
                            <MyButton type={'button'} onClick={() => setModalPublishActive(true)}>Опубликовать</MyButton>
                            <Button onClick={cancelChangesHandle} variant={'outline-danger'} type={'button'}>Отменить
                                изменения</Button>
                        </div>
                    </div>
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
            <PublishHousingModal
                active={modalPublishActive} setActive={setModalPublishActive} housing={values}
            />
        </Container>
    );
};

export default HousingViewPage;