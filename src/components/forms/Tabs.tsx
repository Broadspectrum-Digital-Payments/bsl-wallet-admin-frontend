import React from "react";
import {ITab, ITabProps} from "@/utils/interfaces/ITab";

const Tabs: React.FC<ITabProps> = ({data, selected, setSelected}) => {

    const handleSelectedTab = (tab: ITab) => {
        if (setSelected) setSelected(tab)
    }
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 py-2 pr-10 text-base sm:text-sm"
                    defaultValue={selected?.name}
                >
                    {data.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="">
                    <nav className="mb-px flex space-x-8 text-gray-900" aria-label="Tabs">
                        {data.map((tab) => (
                            <div
                                key={tab.name}
                                className={`px-4 whitespace-nowrap border-b-2 py-3 px-2 text-sm font-medium capitalize hover:cursor-pointer 
                                ${tab.name === selected?.name
                                    ? 'border-purple-900 font-semibold'
                                    : 'border-transparent hover:border-gray-300 hover:text-gray-700'}`}
                                aria-current={tab.name === selected?.name ? 'page' : undefined}
                                onClick={() => handleSelectedTab(tab)}>
                                {tab.label}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
