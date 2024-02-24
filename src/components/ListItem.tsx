import React from "react";
import {IListItem} from "@/utils/interfaces/IListItem";

const ListItem: React.FC<IListItem> = ({title, description, customClasses, children}) => {
    return (
        <div className={`flex justify-between py-3 text-sm font-medium ${customClasses}`}>
            <p className="truncate text-sm font-medium text-gray-900">{title}</p>
            <p className="truncate text-xs text-gray-500">{description}</p>
            {children}
        </div>
    )
}

export default ListItem
