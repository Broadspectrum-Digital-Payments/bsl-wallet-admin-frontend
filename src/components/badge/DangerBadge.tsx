import React from "react";
import {IBadge} from "@/utils/interfaces/IBadge";

const DangerBadge: React.FC<IBadge> = ({text}) => {
    return (

        <span
            className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                        {text}
    </span>
    )
}
export default DangerBadge