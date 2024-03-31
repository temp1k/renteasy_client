import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './css/types_modal.css'
import MyModal from "../MyModal.jsx";
import {Input, MyButton, SearchInput} from "../../../feutures/index.js";
import {getTypesWithSearch} from "./api/typesAPI.js";
import {MdCancel} from "react-icons/md";
import {Button} from "react-bootstrap";

const TypeItem = ({item, onClick}) => {
    return (
        <div className={'item'} onClick={onClick}>
            {item.name}
        </div>
    )
}

TypeItem.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
};

let defaultItems = []
    const TypesModal = ({label, selectedTypes, setSelectedTypes, active, setActive, ...props}) => {
    const [types, setTypes] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const validate = () => {
        if (selectedTypes.length < 1) {
            return 'Выбранные типы не могут быть пустыми';
        }
    }

    const getTypes = (name) => {
        getTypesWithSearch(name)
            .then(data => {
                console.log(data)
                setTypes(data.results)
            })
            .catch(err => {
                console.warn(err)
            })
    }

    useEffect(() => {
        getTypes()
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getTypes(searchValue)
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchValue]);

    useEffect(() => {
        defaultItems = selectedTypes
    }, [active]);

    const addSelectedType = (item) => {
        if (selectedTypes.includes(item)) {
            alert('Данный тип уже выбран')
            return
        }

        setSelectedTypes([...selectedTypes, item])
    }

    const deleteFromSelectedTypes = (item) => {
        setSelectedTypes(selectedTypes.filter(type => type.id !== item.id))
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
        setSelectedTypes(defaultItems)
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
                        placeholder={'Введите тип...'}
                        onChange={(e) => setSearchValue(e.target.value)}
                        click={() => setSearchValue('')}
                    />
                </form>
                <div className="container__choice">
                    <div className={'wrap'}>
                        <label>Выберите тип:</label>
                        <div className={'custom__select'}>
                            {types.map(type => {
                                return (
                                !selectedTypes.includes(type) && <TypeItem item={type} key={type.id}
                                                                           onClick={() => addSelectedType(type)}
                                />
                            )
                            })}
                        </div>
                    </div>
                    <div className={'wrap'}>
                        <label>Выбранные типы:</label>
                        <div className={'custom__select'}>
                            {selectedTypes.map(type =>
                                <TypeItem item={type} key={type.id}
                                          onClick={() => deleteFromSelectedTypes(type)}
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

TypesModal.propTypes = {
    label: PropTypes.string,
    selectedTypes: PropTypes.array,
    setSelectedTypes: PropTypes.func,
};

export default TypesModal;