import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getHousingById, updateHousingAPI} from "../../../../http/api/housingAPI.js";
import {Button, Container} from "react-bootstrap";
import './css/housing_view.css'
import useForm from "../../../../hook/useForm.js";
import {ButtonBack, DropImages, ImageSlider, ListAtrs, SelectCities} from "../../../../components/index.js";
import {CenterLoading, Input, MessageAlert, MyButton, Textarea} from "../../../../feutures/index.js";
import {CategoriesModal, PublishHousingModal} from "../../../../components/Modals/index.js";
import {remakeArrayOfObjectsToArrayId} from "../../../../utils/helpers.js";
import SelectDistricts from "../../../../components/SelectDistricts/SelectDistricts.jsx";

let defaultValues = {
    name: '',
    short_name: '',
    address: '',
    number_of_seats: 0,
    description: '',
    district: 0,
    rating: 0,
    categories: [],
    tags: [],
    images: [],
    metro: 0,
    categories_d: [],
    tags_d: [],
    images_d: [],
}

const HousingViewPage = () => {
    const [loading, setLoading] = useState(true)
    const [loadingBtn, setLoadingBtn] = useState(false)

    const {id} = useParams()
    const [modalCategoriesActive, setModalCategoriesActive] = useState(false)
    const [modalPublishActive, setModalPublishActive] = useState(false)
    const [images, setImages] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [district, setDistrict] = useState({})
    const [city, setCity] = useState({})

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
        temp.district = district.value ? "" : 'Округ не может быть пустым'

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
        setCategories(housingAPI.categories_d)
        setTags(housingAPI.tags_d)
        setDistrict({label: housingAPI.district_d.name, value: housingAPI.district_d.id})
        setCity({label: housingAPI.city_d.name, value: housingAPI.city_d.id})
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
    }, [id]);

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

        setLoadingBtn(true)

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
        let categoriesOfIds = remakeArrayOfObjectsToArrayId(categories);
        categoriesOfIds.forEach((value) => {
            formData.append('categories', value);
        });
        formData.append('district', district.value)
        formData.delete('metro')
        formData.delete('city')

        updateHousingAPI(id, formData)
            .then(data => {
                console.log(data)
                defaultValues = data
                MessageAlert('Запись успешно обновлена!')
                setLoadingBtn(false)
            })
            .catch(err => {
                alert(`Ошибка обновления записи!\n${err}`)
                setLoadingBtn(false)
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
                                <SelectDistricts
                                    selectedDistrict={district}
                                    setSelectedDistrict={setDistrict}
                                    error={errors.district}
                                />
                                <SelectCities
                                    selectedCity={city}
                                    setSelectedCity={setCity}
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
                                <ListAtrs items={categories} onClick={openCategoriesModalHandler} label={'Категории'}/>
                            </div>
                        </div>
                        <div className="row_footer">
                            <MyButton type={'submit'} loading={loadingBtn}>Сохранить</MyButton>
                            <MyButton type={'button'} onClick={() => setModalPublishActive(true)}>Опубликовать</MyButton>
                            <Button onClick={cancelChangesHandle} variant={'outline-danger'} type={'button'}>Отменить
                                изменения</Button>
                        </div>
                    </div>
                </div>
            </form>
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