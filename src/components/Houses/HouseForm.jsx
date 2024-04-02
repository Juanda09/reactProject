/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import CityStateSelect from '../Selects/SelectCities&&States'; // Asegúrate de importar el componente CityStateSelect

export default function HouseForm({ handleSubmit, handleChangeImage, house, defaultState, defaultCity }) {
    const [formData, setFormData] = useState({
        address: house?.address || '',
        city: defaultCity || '', // Utiliza defaultCity como valor inicial
        state: defaultState || '', // Utiliza defaultState como valor inicial
        size: house?.size || '',
        type: house?.type || '',
        zip_code: house?.zip_code || '',
        rooms: house?.rooms || '',
        bathrooms: house?.bathrooms || '',
        parking: house?.parking || false,
        price: house?.price || '',
    });

    // Actualiza el formData cuando defaultState o defaultCity cambien
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            city: defaultCity || prevData.city,
            state: defaultState || prevData.state,
        }));
    }, [defaultState, defaultCity]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="max-w-md w-full mx-auto px-5 py-5">
            <form onSubmit={handleSubmit} className="shadow-md rounded pt-6 pb-10 mb-4 px-10">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Address</label>
                    <input type="text" required name="address" placeholder="Address" value={formData.address}
                        onChange={handleChange} className="shadow appearance-none border rounded w-full focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <CityStateSelect onChange={handleChange} defaultState={formData.state} defaultCity={formData.city} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Size</label>
                    <input type="number" required name="size" placeholder="Size" value={formData.size}
                        onChange={handleChange} className="shadow appearance-none border rounded w-full focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Type</label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange} required
                        className="shadow appearance-none border rounded w-full focus:shadow-outline">
                        <option value="">Select Type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Zip Code</label>
                    <input type="text" required name="zip_code" placeholder="Zip Code" value={formData.zip_code}
                        onChange={handleChange} className="shadow appearance-none border rounded w-full focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Rooms</label>
                    <input type="number" required name="rooms" placeholder="Rooms" value={formData.rooms}
                        onChange={handleChange} className="shadow appearance-none border rounded w-full focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Bathrooms</label>
                    <input type="number" required name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms}
                        onChange={handleChange} className="shadow appearance-none border rounded w-full focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Parking</label>
                    <input type="checkbox" id="parking" name="parking" checked={formData.parking} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Price</label>
                    <input type="number" required name="price" placeholder="Price" value={formData.price}
                        onChange={handleChange} className="shadow appearance-none border rounded w-full focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input onChange={handleChangeImage} id="image" name="image" accept="image/png, image/jpeg" type="file" className="hidden"/>
                    </label>
                </div> 
                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">Save</button>
                </div>
            </form>
        </div>
    );
}
