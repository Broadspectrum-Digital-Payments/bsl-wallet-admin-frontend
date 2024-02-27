import React, {useEffect, useState} from 'react'
import {useReportStore} from "@/store/ReportStore";
import LoanContent from "@/components/loans/LoanList";
import TransactionList from "@/components/transactions/TransactionList";
import {SelectInputItemType} from "@/utils/types/SelectInputItemType";
import SmallCardOptions from "@/components/forms/SmallCardOptions";
import {listReports} from "@/api/report";

const ReportsOverview = () => {
    const {reportType, setReportType} = useReportStore();

    const reportTypeList = [
        // {name: 'analytics', label: 'Analytics'},
        {name: 'loans', label: 'Loans'},
        {name: 'transactions', label: 'Transactions'},
    ]
    const [selectedReportType, setSelectedReportType] = useState<SelectInputItemType>(reportTypeList[0])
    const [statistics, setStatistics] = useState<[]>()
    const handleSelectedReportType = (report: SelectInputItemType) => {
        setSelectedReportType(report)
        setReportType(report.name)
        setSelectedReportType(report)
    }

    const convertStatsToFormattedList = (stats: {
        totalLoanCount: number,
        totalTransactionValue: number
        totalCustomers: number
        totalLenders: number
        totalAgents: number
    }) => {
        return [
            {
                name: 'Total Loan Count',
                value: stats.totalLoanCount.toString() ?? '0',
                change: '+4.75%',
                changeType: 'positive'
            },
            {name: 'Transaction Value', value: stats.totalTransactionValue.toString(), change: '0%', changeType: 'positive'},
            {name: 'Customers', value: stats.totalCustomers.toString(), change: '0%', changeType: 'positive'},
            {name: 'Lenders', value: stats.totalLenders.toString(), change: '0%', changeType: 'positive'},
            {name: 'Agents', value: stats.totalAgents.toString(), change: '0%', changeType: 'positive'}
        ];
    }

    useEffect(() => {
        fetchReports()
    }, [])

    const fetchReports = (params: string = '') => {
        listReports(params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {stats, aggregates} = feedback.data
                    const data = convertStatsToFormattedList(stats)
                    // setStatistics(data)
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    return (
        <>
            <main>
                <div className="relative isolate overflow-hidden">
                    <header className="sm:pb-6">
                        <div
                            className="mx-auto flex max-w-full flex-wrap items-center gap-6 sm:flex-nowrap sm:px-6 lg:px-8 pb-4">
                            <h1 className="text-base font-semibold leading-7 text-gray-900 capitalize">{`${reportType} Report`}</h1>
                            <div
                                className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                            </div>
                            <div className="ml-auto rounded-md py-2 text-sm">
                                <SmallCardOptions selected={selectedReportType}
                                                  setSelected={handleSelectedReportType}
                                                  data={reportTypeList}/>
                            </div>
                        </div>
                    </header>
                    {/*{reportType === 'analytics' &&*/}
                    {/*    <>*/}
                    {/*        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">*/}
                    {/*            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:px-2 xl:px-0">*/}
                    {/*                {statistics?.map((stat, statIdx) => (*/}
                    {/*                    <div*/}
                    {/*                        key={stat.name}*/}
                    {/*                        className={`flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 px-4 py-10 sm:px-6 xl:px-8`}*/}
                    {/*                        style={{*/}
                    {/*                            borderLeftWidth: statIdx % 2 === 1 ? '1px' : '0',*/}
                    {/*                            borderRightWidth: statIdx < statistics?.length - 1 ? '1px' : '0',*/}
                    {/*                            borderColor: 'rgba(0, 0, 0, 0.08)',*/}
                    {/*                        }}*/}
                    {/*                    >*/}
                    {/*                        <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>*/}
                    {/*                        <dd*/}
                    {/*                            className={`text-xs font-medium ${stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700'}`}*/}
                    {/*                        >*/}
                    {/*                            {stat.change}*/}
                    {/*                        </dd>*/}
                    {/*                        <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">*/}
                    {/*                            {stat.value}*/}
                    {/*                        </dd>*/}
                    {/*                    </div>*/}
                    {/*                ))}*/}
                    {/*            </dl>*/}
                    {/*        </div>*/}

                    {/*        <div*/}
                    {/*            className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"*/}
                    {/*            aria-hidden="true"*/}
                    {/*        >*/}
                    {/*            <div*/}
                    {/*                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"*/}
                    {/*                style={{*/}
                    {/*                    clipPath:*/}
                    {/*                        'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',*/}
                    {/*                }}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </>}*/}
                </div>

                {reportType === 'loans' && <LoanContent downloadable={true} filter={true}/>}
                {reportType === 'transactions' && <TransactionList downloadable={true}/>}
            </main>
        </>
    )
}

export default ReportsOverview
