import React from "react";
import {ITable} from "@/utils/interfaces/ITable";
import Button from "@/components/forms/Button";

const Table: React.FC<ITable> = ({children, onButtonClick, buttonText}) => {
    const handleTableButtonClicked = () => {
        if (onButtonClick) return onButtonClick()
    }

    return (
        <div className="px-4 sm:px-6 lg:px-0">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                </div>
                {buttonText && <div className="sm:ml-16 sm:mt-0 sm:flex-none">
                    <Button
                        onClick={handleTableButtonClicked}
                        buttonType="button"
                        styleType="primary"
                        customStyles="block rounded-md px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-60 mt-4"
                    >
                        {buttonText}
                    </Button>
                </div>}
            </div>

            <div className="-mx-4 mt-2 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        {children?.headers?.map((header, index) => (
                            <th key={index} className={`capitalize font-semibold py-3 text-xs ${header.classes}`}>
                                {header.label}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    <>{children?.body}</>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Table