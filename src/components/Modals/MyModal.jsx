import React from 'react';
import PropTypes from 'prop-types';
import './css/modal.css'

const MyModal = ({active, setActive, children}) => {
    return (
        <div className={active ? 'my__modal active' : 'my__modal'} onClick={() => setActive(false)}>
            <div className={active ? 'my__modal__content active' : 'my__modal__content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

MyModal.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
    children: PropTypes.element
};

export default MyModal;