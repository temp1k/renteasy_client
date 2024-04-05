import Swal from "sweetalert2";

const DeleteAlert = (objectName, text, callback) => {
    Swal.fire({
        title: `Вы уверены, что хотите удалить ${objectName}?`,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF8800FF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Да, удалить!",
        cancelButtonText: "Отмена",
    }).then(async (result) => {
        if (result.isConfirmed) {
            callback()
        }
    });
};

export default DeleteAlert;