import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation, useUploadAvatarMutation } from '../../features/api/apiSlice';
import Swal from 'sweetalert2';
import UserForm from './UserForm';
import { useState } from 'react';

export default function UserFormCreate() {
    const navigate = useNavigate();
    const [createUser] = useCreateUserMutation();
    const [uploadAvatar] = useUploadAvatarMutation();
    const [file, setFile] = useState(null);

    const handleChangeAvatar = (e) => {
        setFile(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: e.target.name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            age: e.target.age.value,
            password: e.target.password.value,
        };
        try {
            const response = await createUser(newUser);
            if (response.data.status === "error") {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "El usuario no pudo ser registrado, por favor verifique los datos",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file[0]);
                    uploadAvatar({ _id: response.data._id, file: formData });
                }
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario Creado Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/user');
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <UserForm
            props={{
                handleSubmit: handleSubmit,
                handleChangeAvatar: handleChangeAvatar,
                user: null
            }}
        />
    );
}
