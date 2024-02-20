import React from "react";
import {ITable} from "@/utils/interfaces/ITable";

const Table: React.FC<ITable> = ({children}) => {
    return (
        <div className="sm:px-6 lg:px-0 lg:pt-8">
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        {children?.headers}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">{children?.body}</tbody>
                    <tfoot className="divide-y divide-gray-200 bg-white">{children?.footer}</tfoot>
                </table>
            </div>
        </div>
    )
}

export default Table