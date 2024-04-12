import Swal from "sweetalert2";

const ConfirmAlert = (title, yes_callback, no_callback = {}) => {
    Swal.fire({
        html: `<p>${title}</p>`,
        showCancelButton: true,
        confirmButtonColor: "#FF8800FF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Да",
        cancelButtonText: "Нет",
    }).then(async (result) => {
        if (result.isConfirmed) {
            yes_callback()
        } else if (result.isDismissed) {
            no_callback()
        }
    });
};

export default ConfirmAlert;