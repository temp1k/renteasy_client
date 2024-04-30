import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import s from './SearchInput.module.css'
import {MdCancel} from "react-icons/md";

const SearchInput = ({search, setSearch}) => {
    const [value, setValue] = useState('')

    const handleSearchChange = (e) => {
        setValue(e.target.value)
    }

    const clearInput = (e) => {
        setValue('')
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearch(value)
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [value]);

    return (
        <div className={s.container__search}>
            <input type="text" placeholder='Поиск...'
                   value={value}
                   onChange={handleSearchChange}
                   className={s.search}
            />
            {value &&
                <MdCancel className={s.icon_cancel}
                          onClick={clearInput}
                />
            }
        </div>

    );
};

SearchInput.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func,
};

export default SearchInput;