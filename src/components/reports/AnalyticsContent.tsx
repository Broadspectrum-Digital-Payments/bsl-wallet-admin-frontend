import React, {Fragment} from 'react'
import {
    ArrowDownCircleIcon,
    ArrowPathIcon,
    ArrowUpCircleIcon,
} from '@heroicons/react/24/outline'
import {camelCaseToWords, formatAmount} from "@/utils/helpers";
import Badge from "@/components/Badge";
import {IAnalyticsContent} from "@/utils/interfaces/IAnalyticsContent";

const AnalyticsContent: React.FC<IAnalyticsContent> = ({statistics}) => {

    return (
        <div className="space-y-10 py-16 xl:space-y-20">
            <div>
                <div className="max-w-full px-4 sm:px-6 lg:px-8">
                    <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                        Recent activity
                    </h2>
                </div>
                <div className="mt-4 overflow-hidden border-t border-gray-100">
                    <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <table className="w-full text-left">
                                <thead className="sr-only">
                                <tr>
                                    <th>Amount</th>
                                    <th className="hidden sm:table-cell">Client</th>
                                    <th>More details</th>
                                </tr>
                                </thead>
                                <tbody>
                                {statistics?.map((analysis, key) => (
                                    <Fragment key={analysis.name}>
                                        <tr className="text-sm leading-6 text-gray-900">
                                            <th scope="colgroup" colSpan={3}
                                                className="relative isolate py-2 font-semibold">
                                                <time dateTime={analysis.name}>{analysis.name}</time>
                                                <div
                                                    className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50"/>
                                                <div
                                                    className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50"/>
                                            </th>
                                        </tr>
                                        <tr key={analysis.name} className="capitalize">
                                            <td className="relative py-5 pr-6">
                                                <div className="flex gap-x-6">
                                                    <ArrowUpCircleIcon
                                                        className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                                                        aria-hidden="true"
                                                    />
                                                    <div className="flex-auto">
                                                        <div className="flex items-start gap-x-3">
                                                            <div
                                                                className="text-sm font-medium leading-6 text-gray-900">
                                                                {formatAmount(analysis.totalTransactionValue, 'GHS', true, '0.00a')}
                                                            </div>
                                                            <Badge text="success"/>
                                                        </div>
                                                        <div className="mt-1 text-xs leading-5 text-gray-500">
                                                            {camelCaseToWords('totalTransactionValue')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="absolute bottom-0 right-full h-px w-screen bg-gray-100"/>
                                                <div
                                                    className="absolute bottom-0 left-0 h-px w-screen bg-gray-100"/>
                                            </td>
                                            <td className="hidden py-5 pr-6 sm:table-cell">
                                                <div className="text-sm leading-6 text-gray-900">
                                                    {analysis.totalTransactionVolume}
                                                </div>
                                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                                    {camelCaseToWords('totalTransactionVolume')}
                                                </div>
                                            </td>
                                            <td className="hidden py-5 pr-6 sm:table-cell">
                                                <div className="text-sm leading-6 text-gray-900">
                                                    {formatAmount(analysis.totalLoanValue, 'GHS', true, '0.00a')}
                                                </div>
                                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                                    {camelCaseToWords('totalLoanValue')}
                                                </div>
                                            </td>
                                            <td className="hidden py-5 pr-6 sm:table-cell">
                                                <div className="text-sm leading-6 text-gray-900">
                                                    {analysis.totalLoanVolume}
                                                </div>
                                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                                    {camelCaseToWords('totalLoanVolume')}
                                                </div>
                                            </td>
                                        </tr>
                                    </Fragment>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsContent
