import { Container, Typography, TextField, Button, IconButton, InputAdornment } from '@material-ui/core';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías enviar formData a tu API para autenticación
    };

    return (
        <Container maxWidth="sm" className="mx-auto px-5 py-5">
            <form onSubmit={handleSubmit} className="shadow-md rounded pt-6 pb-10 mb-4 px-10">
                <div className="mb-4">
                    <Typography variant="h6" className="text-gray-700 font-bold mb-2">Email</Typography>
                    <TextField
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            classes: {
                                root: "focus:outline-none focus:ring-2 focus:ring-blue-500",
                                disabled: "bg-gray-100 text-gray-600",
                            },
                        }}
                    />
                </div>
                <div className="mb-4">
                    <Typography variant="h6" className="text-gray-700 font-bold mb-2">Password</Typography>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength="3"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            classes: {
                                root: "focus:outline-none focus:ring-2 focus:ring-blue-500",
                                disabled: "bg-gray-100 text-gray-600",
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="flex justify-center">
                    <Button type="submit" variant="contained" color="primary" className="rounded font-bold py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Iniciar Sesión</Button>
                </div>
            </form>
        </Container>
    );
}
