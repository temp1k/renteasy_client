import Swal from "sweetalert2";


const MessageAlert = (text) => {
    Swal.fire({
        position: "top-end",
        html: `
            <p>${text}</p>
        `,
        showConfirmButton: false,
        timer: 1500
    }).then(r => {});
};

export default MessageAlert;