import React, {useState} from 'react'
import {ICheckboxProps} from "@/utils/interfaces/ICheckboxProps"

const CheckboxInput: React.FC<ICheckboxProps> = ({
                                                     label,
                                                     width = 24,
                                                     height = 24,
                                                 }) => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxClick = () => {
        setChecked(!checked);
    };

    return (
        <div className="relative flex items-start">
            <div className="flex h-6 items-center">
                <input
                    id={label}
                    aria-describedby="candidates-description"
                    name="candidates"
                    type="checkbox"
                    className="h-5 w-5 rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
            </div>
            <div className="ml-3 text-sm leading-6">
                <label htmlFor="candidates" className="font-medium text-gray-900">
                    {label}
                </label>
            </div>
        </div>
    )
}

export default CheckboxInput