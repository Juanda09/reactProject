import { Container, Typography } from '@material-ui/core';

export default function Footer() {
    return (
        <Container maxWidth="xl" className="bg-gray-800 text-white py-4 text-center w-full">
            <Typography variant="h6" className="text-red-500">Proyecto Talento Tech</Typography>
            <Typography variant="subtitle1">Desarrollado por Juan David Huertas Zapata</Typography>
        </Container>
    );
}
