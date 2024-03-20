import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation } from '../../features/api/apiSlice';
import { TextField, Button, Typography, CircularProgress, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Swal from 'sweetalert2';

export default function UserForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: userData, refetch } = useGetUsersQuery();
    const [createUser, { isLoading: isCreating, isError: createError }] = useCreateUserMutation();
    const [updateUser, { isLoading: isUpdating, isError: updateError }] = useUpdateUserMutation();
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        age: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isValidForm, setIsValidForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (id && userData) {
            const user = userData.find(user => user._id === id);
            if (user) {
                setFormData({
                    name: user.name,
                    last_name: user.last_name,
                    age: user.age,
                    email: user.email,
                });
            }
        }
    }, [id, userData]);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userToUpdate = { ...formData };
        try {
            if (id) {
                await updateUser({ id, updatedUser: userToUpdate }).unwrap();
            } else {
                await createUser(formData).unwrap();
            }
            refetch();
            navigate('/user');
            // Mostrar notificación de éxito
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User saved successfully!',
            });
        } catch (error) {
            console.error('Error saving user:', error);
            // Mostrar notificación de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while saving the user. Please try again later.',
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};
    
        // Validar campos requeridos
        Object.keys(formData).forEach((key) => {
            if ((!id && key !== 'password') || (!formData[key] && (key !== 'password' || !id))) {
                newErrors[key] = 'This field is required';
                valid = false;
            }
        });
    
        // Actualizar el estado de errores
        setErrors(newErrors);
    
        // Actualizar el estado de validez del formulario
        setIsValidForm(valid);
    };
    
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Validar el formulario después de cada cambio
        validateForm();
    };

    console.log('isValidForm:', isValidForm);



    return (
        <div className="max-w-md w-full mx-auto px-5 py-5">
            <form onSubmit={handleSubmit} className="shadow-md rounded pt-6 pb-10 mb-4 px-10">
                <Typography variant="h5" gutterBottom>
                    {id ? 'Edit User' : 'Create User'}
                </Typography>
                <TextField
                    label="Name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    error={!!errors.last_name}
                    helperText={errors.last_name}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Age"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    error={!!errors.age}
                    helperText={errors.age}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    margin="normal"
                    type="email"
                />
                {!id && (
                    <TextField
                        label="Password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!id && !formData.password}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}



                <div className="flex justify-center">
                <Button
    type="submit"
    disabled={isCreating || isUpdating || (!id && !isValidForm)}
    variant="contained"
    color="primary"
    disableElevation
>
    {isCreating || isUpdating ? <CircularProgress size={24} /> : 'Save'}
</Button>

                </div>
                {(createError || updateError) && (
                    <Typography variant="body2" color="error" align="center" gutterBottom>
                        Error saving user. Please try again later.
                    </Typography>
                )}
            </form>
        </div>
    );
}
