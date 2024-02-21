import React from "react";
import {IBadge} from "@/utils/interfaces/IBadge";

const SuccessBadge: React.FC<IBadge> = ({text}) => {
    return (

        <span
            className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {text}
    </span>
    )
}
export default SuccessBadge