import React from 'react';
import Swal from "sweetalert2";

const SuccessAlert = (title, text, callback={}) => {
    Swal.fire({
        title: title,
        text: text,
        icon: "success"
    }).then(r => callback);
};

export default SuccessAlert;