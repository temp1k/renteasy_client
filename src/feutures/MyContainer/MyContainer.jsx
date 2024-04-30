import PropTypes from 'prop-types';
import s from './MyContainer.module.css'

const MyContainer = ({children, className, ...props}) => {
    return (
        <div className={s.my__container+' '+className} {...props}>
            {children}
        </div>
    );
};

MyContainer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default MyContainer;