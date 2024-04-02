import React, {useState} from 'react';
import './style/index.css'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';
import PropTypes from "prop-types";

const ImageSlider = ({slides, imgWidth=300, imgHeight = 280}) => {
    const [current, setCurrent] = useState(0);
    // eslint-disable-next-line react/prop-types
    const length = slides.length;
    let sizeArrows = imgWidth < 180 ? '1rem' : '1.5rem'

    const nextSlide = (e) => {
        e.stopPropagation()
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = (e) => {
        e.stopPropagation()
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    if (slides.length < 2) {
        return (
            <div className={'image-container'}>
                {/* eslint-disable-next-line react/prop-types */}
                <img src={slides[0].image} alt='travel image' className='image' width={imgWidth} height={imgHeight}/>
            </div>
        )
    }

    return (
        <section className='slider'>
            {slides.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (
                            <div className={'image-container'}>
                                <div className="img__container" style={{width:imgWidth, height:imgHeight}}>
                                    <img src={slide.image} alt='travel image' className='image' />
                                </div>
                                <FaArrowAltCircleLeft style={{fontSize: sizeArrows}} className='left-arrow' onClick={prevSlide}/>
                                <FaArrowAltCircleRight style={{fontSize: sizeArrows}} className='right-arrow' onClick={nextSlide}/>
                            </div>
                        )}
                    </div>
                );
            })}
        </section>
    );
}

ImageSlider.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string
        })
    ),
}

export {ImageSlider};