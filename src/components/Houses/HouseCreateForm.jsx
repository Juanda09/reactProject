import { useNavigate } from 'react-router-dom';
import { useCreateHouseMutation, useUploadImageMutation } from '../../features/api/apiHouseSlice';
import Swal from 'sweetalert2';
import HouseForm from './HouseForm';
import { useState } from 'react';


export default function HouseCreateForm() {
    const navigate = useNavigate();
    const [createHouse] = useCreateHouseMutation();
    const [uploadImage] = useUploadImageMutation();
    const [imageFile, setImageFile] = useState(null);

    const handleChangeImage = (e) => {
        setImageFile(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newHouse = {
            address: e.target.address.value,
            city: e.target.city.value,
            state: e.target.state.value,
            size: e.target.size.value,
            type: e.target.type.value,
            zip_code: e.target.zip_code.value,
            rooms: e.target.rooms.value,
            bathrooms: e.target.bathrooms.value,
            parking: e.target.parking.checked,
            price: e.target.price.value,
        };
        try {
            const response = await createHouse(newHouse);
            if (response.data.status === "error") {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "La casa no pudo ser registrada, por favor verifique los datos",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                if (imageFile) {
                    const formData = new FormData();
                    formData.append("file", imageFile[0]); // Cambiar "image" a "file"
                    uploadImage({ codigo: response.data.code, formData });    
                }
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Casa Creada Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/houses');
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <HouseForm
            handleSubmit={handleSubmit}
            handleChangeImage={handleChangeImage}
            house={null}
        />
    );
}
