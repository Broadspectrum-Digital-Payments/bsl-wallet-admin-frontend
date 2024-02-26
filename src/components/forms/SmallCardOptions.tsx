import {RadioGroup} from '@headlessui/react'
import React from "react";
import {ISmallCardOptions} from "@/utils/interfaces/ISmallCardOptions";

const SmallCardOptions: React.FC<ISmallCardOptions> = ({label, data, selected, setSelected, customClasses}) => {

    return (
        <div className={customClasses}>
            <RadioGroup value={selected} onChange={setSelected} className="mt-2">
                <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
                <div className="grid grid-cols-3 gap-3">
                    {data.map((option) => (
                        <RadioGroup.Option
                            key={option.name}
                            value={option}
                            className={({active, checked}) =>
                                `${option.name === selected.name ? 'focus:outline-none' : ''}
                                    ${active ? 'ring-2 ring-slate-600 ring-offset-2 font-semibold' : ''}
                                    ${checked ? 'bg-slate-600 text-white hover:bg-slate-500' : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50'} cursor-pointer  flex items-center justify-center rounded-md py-3 px-3 text-sm capitalize sm:flex-1`}
                        >
                            <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}

export default SmallCardOptions
