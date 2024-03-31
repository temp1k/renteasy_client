import React, {useEffect, useState} from 'react';
import {Input, MyButton, MySelect, Textarea} from "../../feutures/index.js";
import {DropImages, ListAtrs} from "../../components/index.js";
import {Container} from "react-bootstrap";
import './css/housingcreate.css'
import {CategoriesModal, TypesModal} from "../../components/Modals/index.js";
import {createHousingAPI} from "./api/housingCreateAPI.js";
import {getAllCountriesAPI} from "../../http/api/countryAPI.js";
import useForm from "../../hook/useForm.js";
import {PASSWORD_REGEXP} from "../../utils/validation.js";
import {useNavigate} from "react-router-dom";
import {MY_HOUSING_ROUTE} from "../../utils/consts/paths.js";

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
    const navigate = useNavigate()

    const [images, setImages] = useState([])

    const [types, setTypes] = useState([])
    const [modalTypesActive, setModalTypesActive] = useState(false)

    const [categories, setCategories] = useState([])
    const [modalCategoriesActive, setModalCategoriesActive] = useState(false)

    const [tags, setTags] = useState([])

    const [countries, setCountries] = useState([])

    const validate = (fieldValues = values) => {
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

        console.log(categories)

        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(defaultValues, validate)

    useEffect(() => {
        getAllCountriesAPI()
            .then(data => {
                setCountries(data)
            })
            .catch(err => {
                console.warn(err)
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            const formData = new FormData()
            for (let key in values) {
                if (Array.isArray(values[key])) {
                    // Если значение является массивом, переберем его и добавим каждый элемент
                    values[key].forEach((value, index) => {
                        formData.append(key, value);
                    });
                } else {
                    formData.append(key, values[key]);
                }
            }

            let imagesOfIds = images.map(obj => obj.id);
            imagesOfIds.forEach((value) => {
                formData.append('images', value);
            });
            let typesOfIds = types.map(obj => obj.id);
            typesOfIds.forEach((value) => {
                formData.append('types', value);
            });
            let categoriesOfIds = categories.map(obj => obj.id);
            categoriesOfIds.forEach((value) => {
                formData.append('categories', value);
            });

            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            createHousingAPI(formData)
                .then(data => {
                    alert('Жилье успешно создано')
                    navigate('/pro/housings/'+data.id, {replace: true})
                })
                .catch(err => {
                    console.error(err)
                    alert('Ошибка добавления жилья\n'+err)
                })
        }
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
                        <MySelect items={countries} label={'Страна'}
                                  name={'country'}
                                  selectValue={values.country} onChange={handleInputChange}
                                  error={errors.country}
                        />
                    </div>
                    <div className="container__images">
                        <DropImages images={images} setImages={setImages}/>
                    </div>
                    <div className="container__atrs">
                        <ListAtrs items={types} onClick={openTypeModalHandle} label={'Типы'}/>
                        <ListAtrs items={categories} onClick={openCategoriesModalHandle} label={'Категории'}/>
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