import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../../features/api/apiSlice';
import { useDeleteUserMutation } from '../../features/api/apiSlice';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, TextField, Typography } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2'; // Importar SweetAlert2

const useStyles = makeStyles({
    container: {
        marginBottom: '1rem',
    },
    table: {
        minWidth: 650,
    },
    headerCell: {
        backgroundColor: '#333',
        color: '#fff',
        fontWeight: 'bold',
    },
    cell: {
        padding:'0.5rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        verticalAlign:'middle',
        border: '1px solid #ddd',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
        '&:focus': {
            backgroundColor: '#f5f5f5',
        },
        '&:active': {
            backgroundColor: '#f5f5f5',
        },
        '&:visited': {
            backgroundColor: '#f5f5f5',
        },
    },
    avatar: {
        width: '40px',
        height: '40px',
    },
    highlightedRow: {
        backgroundColor: '#f0f0f0',
    },
});

export default function UserList() {
    const { data: users, isLoading, isError, error, refetch } = useGetUsersQuery();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;
    const classes = useStyles();
    const [deleteUserMutation] = useDeleteUserMutation();

    if (isLoading) return <p>Cargando usuarios...</p>;
    else if (isError) return <div>Error: {error.message}</div>;

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.age.toString().includes(searchTerm.toLowerCase())
    );

    const totalUsers = filteredUsers.length;

    const getCurrentUsers = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalUsers);
        return filteredUsers.slice(startIndex, endIndex);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleDeleteUser = async (id) => {
        // Mostrar el cuadro de diálogo de confirmación
        const confirmation = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo'
        });

        // Si el usuario confirma la eliminación
        if (confirmation.isConfirmed) {
            try {
                await deleteUserMutation({ id }).unwrap(); // Utiliza mutateAsync para realizar la eliminación
                // Recargar la lista de usuarios

                // Mostrar un mensaje de éxito si la eliminación es exitosa
                Swal.fire(
                    '¡Eliminado!',
                    'El usuario ha sido eliminado.',
                    'success'
                );
                refetch();
            } catch (error) {
                // Mostrar un mensaje de error si ocurre un problema
                console.error('Error deleting user:', error);
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar el usuario.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="flex flex-col items-center " style={{ marginTop: '20px' }}>
            <TextField
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                style={{ marginBottom: '1rem', width: '300px' }}
            />
            {totalUsers === 0 && (
                <Typography variant="h6" gutterBottom>
                    Usuario no encontrado
                </Typography>
            )}
            {totalUsers > 0 && (
                <TableContainer component={Paper} className={classes.container}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.headerCell}>Name</TableCell>
                                <TableCell className={classes.headerCell}>Last Name</TableCell>
                                <TableCell className={classes.headerCell}>Email</TableCell>
                                <TableCell className={classes.headerCell}>Age</TableCell>
                                <TableCell className={classes.headerCell}>Avatar</TableCell>
                                <TableCell className={classes.headerCell}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getCurrentUsers().map(user => (
                                <TableRow key={user._id} className={classes.highlightedRow}>
                                    <TableCell className={classes.cell}>{user.name}</TableCell>
                                    <TableCell className={classes.cell}>{user.last_name}</TableCell>
                                    <TableCell className={classes.cell}>{user.email}</TableCell>
                                    <TableCell className={classes.cell}>{user.age}</TableCell>
                                    <TableCell className={classes.cell}>
                                        <Avatar alt="Avatar" src={user.avatar} className={classes.avatar} />
                                    </TableCell>
                                    <TableCell className={classes.cell}>
                                        <IconButton component={Link} to={`/user/${user._id}`} className="mr-2 bg-gray-900 text-white rounded hover:bg-gray-700">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleDeleteUser(user._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {totalUsers > 0 && (
                <TablePagination
                    rowsPerPageOptions={[itemsPerPage]}
                    component="div"
                    count={totalUsers}
                    rowsPerPage={itemsPerPage}
                    page={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
