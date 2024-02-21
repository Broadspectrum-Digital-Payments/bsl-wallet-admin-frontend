import React from "react";
import {IBadge} from "@/utils/interfaces/IBadge";

const WarningBadge: React.FC<IBadge> = ({text}) => {
    return (

        <span
            className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                        {text}
    </span>
    )
}
export default WarningBadge