import React from 'react';
import PropTypes from 'prop-types';
import s from './ContainerImages.module.css'

const ContainerImages = ({housing, ...props}) => {
    return (
        <div className={s.container_images}
            style={props.height && {height: props.height}}
        >
            {housing.images_d.map(img =>
                <div key={img.id} className={s.container_img}>
                    <img  src={img.image} alt={`Изображение ${housing.name}`}/>
                </div>
            )}
        </div>
    );
};

ContainerImages.propTypes = {
    housing: PropTypes.object,
    height: PropTypes.string,
};

export default ContainerImages;