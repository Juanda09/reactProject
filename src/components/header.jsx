import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar className="bg-gray-800">
                <Typography variant="h6" component="div" className="flex-grow">
                <Button component={NavLink} to="/" color="inherit" className="hover:text-blue-500">
                    Inicio
                </Button>
                </Typography>
                <ul className="flex px-8 space-x-5">
                    <li>
                        <Button component={NavLink} to="/user" color="inherit" className="hover:text-blue-500">
                            Usuarios
                        </Button>
                    </li>
                    <li>
                        <Button component={NavLink} to="/create-user" color="inherit" className="hover:text-blue-500">
                            Crear Usuario
                        </Button>
                    </li>
                </ul>
                <Button component={NavLink} to="/login" color="inherit" className="hover:text-blue-500">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}
