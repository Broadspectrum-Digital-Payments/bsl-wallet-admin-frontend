import React from "react";
import {IBadge} from "@/utils/interfaces/IBadge";

const Badge: React.FC<IBadge> = ({text, customClasses}) => {
    const badgeClasses: Record<string, string> = {
        danger: 'bg-red-50 text-red-700 ring-red-600/20',
        failed: 'bg-red-50 text-red-700 ring-red-600/20',
        secondary: 'bg-gray-50 text-gray-700 ring-gray-600/20',
        completed: 'bg-green-50 text-green-700 ring-green-600/20',
        success: 'bg-green-50 text-green-700 ring-green-600/20',
        warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        queued: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    }

    return (
        <div
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeClasses[text]} ${customClasses}`}>
            {text}
        </div>
    )
}
export default Badge