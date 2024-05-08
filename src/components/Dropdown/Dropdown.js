// import React, { useState, useRef, useEffect } from 'react';
// import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';
// import './Dropdown.css';

// const Dropdown = ({ options, defaultSelectedValue, onSelect, openDirection = 'down' }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const handleToggle = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleSelect = (value) => {
//         setSelectedValue(value);
//         onSelect(value);
//         setIsOpen(false);
//     };

//     const dropdownClass = `dropdown-list dropdown-${openDirection}`;

//     return (
//         <div className="custom-dropdown" ref={dropdownRef}>
//             <div className="dropdown-header" onClick={handleToggle}>
//                 <span>{selectedValue ? selectedValue.label : 'Select'}</span>
//                 {isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
//             </div>
//             {isOpen && (
//                 <ul className={dropdownClass}>
//                     {options.map((option) => (
//                         option.value !== selectedValue.value && (
//                             <li key={option.value} onClick={() => handleSelect(option)}>
//                                 {option.label}
//                             </li>
//                         )
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default Dropdown;

import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import './Dropdown.css';

const Dropdown = ({ options, defaultSelectedValue, onSelect, openDirection = 'down' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);
    const dropdownRef = useRef(null);

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

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        if (!option.disabled) {
            setSelectedValue(option);
            onSelect(option);
            setIsOpen(false);
        }
    };

    // If dropdown is open, show "30 s"
    const displayOptions = isOpen ? options : [defaultSelectedValue];

    const dropdownClass = `dropdown-list dropdown-${openDirection}`;

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={handleToggle}>
                <span>{selectedValue ? selectedValue.label : 'Select'}</span>
                {isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
            </div>
            {isOpen && (
                <ul className={dropdownClass}>
                    {displayOptions.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={option.disabled ? 'disabled' : ''}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;