import React from "react";
import {ILoanStats} from "@/utils/interfaces/ILoanStats";
import {camelCaseToWords, formatAmount} from "@/utils/helpers";

const LoanStats: React.FC<ILoanStats> = ({data}) => {
    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {data?.map((item) => (
                    <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500 capitalize">{camelCaseToWords(item.name)}</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{formatAmount(item.value, 'GHS', false)}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}

export default LoanStats
