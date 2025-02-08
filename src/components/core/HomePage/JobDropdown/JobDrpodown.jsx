import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";

const JobDropdown = ({ fetchData, title, filterKey, setSelectedSectorId, setSelectedServiceId }) => {
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetchData();
                if (response.data && Array.isArray(response.data)) {
                    setOptions(response.data);
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOptions();
    }, [fetchData]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (option) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set(filterKey, option.sectorId || option.serviceId || option._id);
        navigate(`/find-job?${queryParams.toString()}`);
        if (setSelectedSectorId && option.sectorId) {
            setSelectedSectorId(option.sectorId);
        }
        if (setSelectedServiceId && option.serviceId) {
            setSelectedServiceId(option.serviceId);
        }
        setIsOpen(false);
    };

    return (
        <div className="my-4">
            <div ref={dropdownRef}>
                <button
                    className="border rounded-lg py-2 w-full bg-white flex justify-between items-center px-4"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p>{title}</p>
                    <FaAngleDown />
                </button>
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-60' : 'max-h-0'
                    }`}
                >
                    <div className="mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-2 p-4 max-h-60 overflow-auto">
                            {options.length > 0 ? options.map(option => (
                                <div
                                    key={option.sectorId || option.serviceId || option._id}
                                    onClick={() => handleChange(option)}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded"
                                >
                                    {option.sectorName || option.serviceName || option._id} ({option.count})
                                </div>
                            )) : (
                                <div className="col-span-4 text-center py-2">No data available</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDropdown;

