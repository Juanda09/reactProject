import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../../features/api/apiSlice';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

export default function UserList() {
    const { data: users, isLoading, isError, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [pageNumber, setPageNumber] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(5); // Inicialmente 5 usuarios por página
    const [searchTerm, setSearchTerm] = useState('');

    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = users && users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(pagesVisited, pagesVisited + usersPerPage);

    const pageCount = Math.ceil(users?.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: `¿Estás seguro que deseas eliminar al usuario ${user.name} ${user.last_name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(user._id)
            }
        });
    }

    const handlePerPageChange = (e) => {
        setUsersPerPage(parseInt(e.target.value));
        setPageNumber(0); // Reiniciar a la primera página cuando cambia el número de usuarios por página
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPageNumber(0); // Reiniciar a la primera página cuando se realiza una búsqueda
    };

    if (isLoading) return <div role="status" className='flex justify-center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>;
    else if (isError) return (<div>Error: {error.message} </div>)

    return (
        <div className="overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8 mb-4">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="flex justify-between items-center px-4 py-3 sm:px-6">
                            <div>
                                <label htmlFor="searchInput" className="block text-gray-700 font-bold mb-2">
                                    Buscar:
                                </label>
                                <input
                                    id="searchInput"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Buscar por nombre o apellido..."
                                    onChange={handleSearch}
                                    value={searchTerm}
                                />
                            </div>
                            <div>
                                <label className="mr-2">Usuarios por Página:</label>
                                <select value={usersPerPage} onChange={handlePerPageChange} className="border border-gray-300 rounded-md px-2 py-1">
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Apellido
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Edad
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Avatar
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {displayUsers.map(user => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.last_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={`http://localhost:4000/${user.avatar}`} alt={`${user.name}'s Avatar`} className="h-10 w-10 rounded-full" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex">
                                                <Link to={`/user/${user._id}`} className="text-indigo-600 hover:text-indigo-900 mr-2">Editar</Link>
                                                <button onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-900">Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination justify-center mt-4"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
        </div>
    );
}
