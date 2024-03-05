/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';

const Dropdown = ({setLanguage}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef(null);

    const languages = ['Spanish', 'German'];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option, e) => {
        e.preventDefault();
        setSelectedOption(option);
        setLanguage(option);
        setIsOpen(false);
    };

    // Handler for clicking outside of the dropdown
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Effect hook to set up and clean up the event listener
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left mb-2" ref={dropdownRef}>
            <div>
                <button type="button" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black rounded-md bg-opacity-20 shadow-md hover:shadow-lg hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={toggleDropdown}>
                    {selectedOption || 'Languages'}
                    <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {languages.map((language, index) => (
                            <button key={index} onClick={(e) => handleOptionClick(language, e)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {language}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
