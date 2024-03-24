import React from 'react';
import {Carousel} from "react-bootstrap";
import PropTypes from "prop-types";

const CarouselImages = ({images, imgWidth, imgHeight}) => {
    return (
        <Carousel data-bs-theme="dark" style={{width: imgWidth}}>
            {images.map((img, index) => {
                return (
                    <Carousel.Item key={index}>
                        <img
                            width={imgWidth}
                            height={imgHeight}
                            className="d-block w-100"
                            src={img.image}
                            alt="First slide"
                        />
                    </Carousel.Item>
                )
            })
            }

        </Carousel>
    );
};

CarouselImages.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string
        })
    ),
}

export default CarouselImages;