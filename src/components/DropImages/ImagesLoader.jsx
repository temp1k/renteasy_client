import React, {useState} from 'react';
import './css/images_loader.css'
import {MdCancel} from "react-icons/md";
import {deleteImageAPI, postImageAPI} from "./api/imageAPI.js";
import {getLastFragmentFromUrl} from "../../utils/helpers.js";

const ImagesLoader = ({images, setImages}) => {
    const [drag, setDrag] = useState(false)

    const dragStartHandler = e => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = e => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = e => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        console.log(files.length)
        try {
            const formData = new FormData()
            formData.append('image', files[0])

            postImageAPI(formData)
                .then(data => {
                    console.log(data)
                    setImages([...images, data])
                })
                .catch(err => {
                    console.warn(err)
                })
        } catch (err) {
            console.error(err)
        }
        setDrag(false)
    }

    const deleteImageHandler = image_id => {
        if (!confirm('Вы уверены, что хотите удалить это изображение?')) return
        deleteImageAPI(image_id)
            .then(() => {
                setImages(images.filter(image => image.id !== image_id))
            })
            .catch(err => {
                console.warn(err)
            })
    }

    return (
        <div>
            <div className="loader">
                {drag ?
                    <div className="drop-area drop-active"
                         onDragStart={dragStartHandler}
                         onDragLeave={dragLeaveHandler}
                         onDragOver={dragStartHandler}
                         onDrop={onDropHandler}
                    >
                        Отпустите изображения, чтобы загрузить их
                    </div>
                    :
                    <div className="drop-area drop-sleep"
                         onDragStart={dragStartHandler}
                         onDragLeave={dragLeaveHandler}
                         onDragOver={dragStartHandler}
                    >
                        Перенесите изображения, чтобы загрузить их
                    </div>
                }
            </div>
            {images.length > 0 && <div className="loaded-images">
                <p className="loaded-header">Загруженные изображения:</p>
                <ul>
                    {images.map(image =>
                        <li className={'loaded-image'} key={image.id}>{getLastFragmentFromUrl(image.image)}
                            <MdCancel className={'icon__cancel'} onClick={e => deleteImageHandler(image.id)}/>
                        </li>
                    )}
                </ul>
            </div>}
        </div>
    );
};

export default ImagesLoader;