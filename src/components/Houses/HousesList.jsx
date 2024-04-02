import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetHousesQuery, useDeleteHouseByCodigoMutation } from '../../features/api/apiSlice';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

export default function HousesList() {
    const { data: houses, isLoading, isError, error } = useGetHousesQuery();
    const [deleteHouse] = useDeleteHouseByCodigoMutation();
    const [pageNumber, setPageNumber] = useState(0);
    const [housesPerPage, setHousesPerPage] = useState(5); // Inicialmente 5 casas por página
    const [houseTypeFilter, setHouseTypeFilter] = useState("");

    const pagesVisited = pageNumber * housesPerPage;

    const filteredHouses = houseTypeFilter ? houses?.filter(house => house.type === houseTypeFilter) : houses;
    const displayHouses = filteredHouses && filteredHouses.slice(pagesVisited, pagesVisited + housesPerPage);

    const pageCount = Math.ceil(filteredHouses?.length / housesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleDeleteHouse = (code) => {
        Swal.fire({
            title: `¿Estás seguro que deseas eliminar la Casa con código ${code}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteHouse(code);
            }
        });
    };

    const handlePerPageChange = (e) => {
        setHousesPerPage(parseInt(e.target.value));
        setPageNumber(0); // Reiniciar a la primera página cuando cambia el número de casas por página
    };

    const handleFilterChange = (e) => {
        setHouseTypeFilter(e.target.value);
        setPageNumber(0); // Reiniciar a la primera página cuando cambia el filtro
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
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <div className="flex justify-between items-center px-4 py-3 sm:px-6">
                            <div>
                                <label htmlFor="houseTypeFilter" className="block text-sm font-medium text-gray-700">Filter by Type:</label>
                                <select
                                    id="houseTypeFilter"
                                    name="houseTypeFilter"
                                    onChange={handleFilterChange}
                                    value={houseTypeFilter}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="">All</option>
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="housesPerPage" className="block text-sm font-medium text-gray-700">Houses Per Page:</label>
                                <select
                                    id="housesPerPage"
                                    name="housesPerPage"
                                    onChange={handlePerPageChange}
                                    value={housesPerPage}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
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
                                        Code
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        City
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        State
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Zip Code
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rooms
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Bathrooms
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Parking
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {displayHouses.map((house) => (
                                    <tr key={house.code}>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.city}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.state}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.size}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.zip_code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.rooms}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.bathrooms}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.parking ? "Yes" : "No"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{house.image && <img src={`http://localhost:4000/${house.image}`} alt="House" className="h-10 w-10 rounded-full" />}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button onClick={() => handleDeleteHouse(house.code)} className="text-red-600 hover:text-red-900">Delete</button>
                                            <Link to={`/houses/${house.code}`} className="ml-2 text-indigo-600 hover:text-indigo-900">Edit</Link>
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
