import React, {useState} from 'react';
import './css/images_loader.css'
import {MdCancel} from "react-icons/md";
import {deleteImageAPI, postImageAPI} from "./api/imageAPI.js";
import {getLastFragmentFromUrl} from "../../utils/helpers.js";
import Swal from "sweetalert2";
import {DeleteAlert, SuccessAlert} from "../../feutures/index.js";

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
        addImageToServer(files)
        setDrag(false)
    }

    const addImageToServer = (files) => {
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
    }

    const deleteImageHandler = image_id => {
        DeleteAlert(
            "Изображение",
            'После удаления, изображение станет недоступным',
            () => {
                deleteImageAPI(image_id)
                    .then(() => {
                        setImages(images.filter(image => image.id !== image_id))
                        SuccessAlert('Удалено!', 'Вы успешно удалили изображение')
                    })
                    .catch(err => {
                        console.warn(err)
                    })
            })
    }

    const handleClickBtn = () => {
        document.getElementById('fileInput').click();
    }

    function handleInputFileChange(e) {
        e.preventDefault()
        let files = e.target.files;
        addImageToServer(files)
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
                        <div>
                            Перенесите изображения, чтобы загрузить их
                        </div>
                        <button type={'button'} onClick={handleClickBtn} className={'btn-upload'}>Выбрать файл</button>
                        <input id={'fileInput'} type={'file'} onChange={handleInputFileChange} style={{display: 'none'}}
                               accept=".jpg, .jpeg, .png"/>
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