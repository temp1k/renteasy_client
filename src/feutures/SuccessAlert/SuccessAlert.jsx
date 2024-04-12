import React from 'react';
import Swal from "sweetalert2";

const SuccessAlert = (title, text='', callback={}) => {
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonColor: "#294ecb",
    }).then(r => callback());
};

export default SuccessAlert;