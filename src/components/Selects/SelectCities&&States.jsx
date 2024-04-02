/* eslint-disable react/prop-types */
import { useState } from 'react';
import citiesByState from '../CityByStates.json';

export default function CityStateSelect({ handleChange, defaultState, defaultCity }) {
    const [selectedState, setSelectedState] = useState(defaultState || '');
    const [selectedCity, setSelectedCity] = useState(defaultCity || '');

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedCity('');
        handleChange(e); // Llama a la función handleChange del padre
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        handleChange(e); // Llama a la función handleChange del padre
    };

    return (
        <div>
            <label htmlFor="state" className="block text-gray-700 font-bold mb-2">State:</label>
            <select id="state" value={selectedState} onChange={handleStateChange} className="shadow appearance-none border rounded w-full focus:shadow-outline">
                <option value="">Select State</option>
                {Object.keys(citiesByState).map((state) => (
                    <option key={state} value={state}>{state.toUpperCase()}</option>
                ))}
            </select>
            <br />

            <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City:</label>
            <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState} className="shadow appearance-none border rounded w-full focus:shadow-outline">
                <option value="">Select City</option>
                {/* Verificamos que citiesByState[selectedState] no sea undefined */}
                {selectedState && citiesByState[selectedState] && citiesByState[selectedState].map((city) => (
                    <option key={city} value={city}>{city.toUpperCase()}</option>
                ))}
            </select>
        </div>
    );
}
