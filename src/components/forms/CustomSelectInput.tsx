import React, { ChangeEvent, useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface SelectInputProps {
    options: Option[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    label: string;
    customClasses?: string
}

const CustomSelectInput: React.FC<SelectInputProps> = ({ label, options, onChange, value,  customClasses}) => {
    return (
        <div className="">
            <label className="block text-sm font-medium text-gray-700 pb-3">{label}</label>
        <select
            className={`bg-white block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 ${customClasses}`}
            onChange={onChange}
            value={value}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        </div>
    );
};


export default CustomSelectInput;