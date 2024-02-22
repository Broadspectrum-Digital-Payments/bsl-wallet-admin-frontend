import React from "react";
import {ITableData} from "@/utils/interfaces/ITable";

const TData: React.FC<ITableData> = ({children, label = '', customClasses}) => {
    return (
        <td className={`px-3 py-4 text-sm text-gray-500 ${customClasses}`}>
            {children}
            {label}
        </td>
    )
}
export default TData