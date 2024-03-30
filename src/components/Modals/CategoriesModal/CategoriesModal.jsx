import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import MyModal from "../MyModal.jsx";
import {Input, MyButton} from "../../../feutures/index.js";
import {Button} from "react-bootstrap";
import {getCategoriesWithSearchAPI} from "./api/typesAPI.js";
import '../TypesModal/css/types_modal.css'


const TypeItem = ({item, onClick}) => {
    return (
        <div className={'item'} onClick={onClick}>
            <label>{item.name}</label>
        </div>
    )
}

TypeItem.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
};

let defaultItems = []
const CategoriesModal = ({label, selectedCategories, setSelectedCategories, active, setActive}) => {
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const validate = () => {
        if (selectedCategories.length < 1) {
            return 'Выбранные категории не могут быть пустыми';
        }
    }

    const getCategories = (name) => {
        getCategoriesWithSearchAPI(name)
            .then(data => {
                console.log(data)
                setCategories(data.results)
            })
            .catch(err => {
                console.warn(err)
            })
    }

    useEffect(() => {
        getCategories()
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getCategories(searchValue)
        }, 550)

        return () => clearTimeout(delayDebounceFn)
    }, [searchValue]);

    useEffect(() => {
        defaultItems = selectedCategories
    }, [active]);

    const addSelectedCategory = (item) => {
        if (selectedCategories.includes(item)) {
            alert('Данный тип уже выбран')
            return
        }

        setSelectedCategories([...selectedCategories, item])
    }

    const deleteFromSelectedCategories = (item) => {
        setSelectedCategories(selectedCategories.filter(category => category.id !== item.id))
    }

    const save = () => {
        const errors = validate()
        if (errors) {
            alert(errors)
            return
        }
        setActive(false)
    }

    const cancel = () => {
        setSelectedCategories(defaultItems)
        setActive(false)
    }

    return (
        <MyModal active={active} setActive={setActive}>
            <div className={'modal__container'}>
                <p className={'modal__header'}>{label}</p>
                <form className={'search__form'}>
                    <Input
                        type={'text'}
                        value={searchValue}
                        placeholder={'Введите катерогию...'}
                        onChange={(e) => setSearchValue(e.target.value)}
                        click={() => setSearchValue('')}
                    />
                </form>
                <div className="container__choice">
                    <div className={'wrap'}>
                        <label>Выберите тип:</label>
                        <div className={'custom__select'}>
                            {categories.map(category => {
                                return (
                                    !selectedCategories.includes(category) &&
                                    <TypeItem item={category} key={category.id}
                                              onClick={() => addSelectedCategory(category)}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className={'wrap'}>
                        <label>Выбранные категории:</label>
                        <div className={'custom__select'}>
                            {selectedCategories.map(category =>
                                <TypeItem item={category} key={category.id}
                                          onClick={() => deleteFromSelectedCategories(category)}
                                />
                            )
                            }
                        </div>
                    </div>
                </div>
                <div className={'footer__modal'}>
                    <MyButton type={'button'} onClick={() => save()}>Сохранить</MyButton>
                    <Button variant={'danger'} onClick={() => cancel()}>Отмена</Button>
                </div>
            </div>
        </MyModal>
    );
};

CategoriesModal.propTypes = {
    label: PropTypes.string,
    selectedCategories: PropTypes.array,
    setSelectedCategories: PropTypes.func,
    active: PropTypes.bool,
    setActive: PropTypes.func,
};

export default CategoriesModal;