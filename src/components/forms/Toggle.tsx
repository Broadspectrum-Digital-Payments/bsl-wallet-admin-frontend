import React from 'react'
import {Switch} from '@headlessui/react'
import {IToggle} from "@/utils/interfaces/IToggle";

const Toggle: React.FC<IToggle> = ({enabled, handleToggle, children}) => {

    return (
        <Switch
            checked={enabled}
            onChange={handleToggle}
            className={`${enabled ? 'bg-purple-900' : 'bg-gray-200'} relative inline-flex h-5 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`
            }
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-3' : 'translate-x-0'} pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
            {children}
        </Switch>
    )
}

export default Toggle
