import React, {useState, useEffect} from 'react'
import {useReportStore} from "@/store/ReportStore";
import LoanContent from "@/components/loans/LoanList";
import TransactionList from "@/components/transactions/TransactionList";
import {SelectInputItemType} from "@/utils/types/SelectInputItemType";
import SmallCardOptions from "@/components/forms/SmallCardOptions";
import {listReports} from "@/api/report";
import {compareMonthlyData, formatAmount} from "@/utils/helpers";
import {ReportStatType} from "@/utils/types/ReportStatType";
import {ReportAggregateType} from "@/utils/types/ReportAggregateType";
import {ReportAggregateItemType} from "@/utils/types/ReportAnalysisItemType";
import AnalyticsContent from "@/components/reports/AnalyticsContent";
import {ReportSummaryType} from "@/utils/types/ReportSummaryType";

const ReportsOverview = () => {
    const {reportType, setReportType} = useReportStore();

    const reportTypeList = [
        {name: 'analytics', label: 'Analytics'},
        {name: 'loans', label: 'Loans'},
        {name: 'transactions', label: 'Transactions'},
    ]
    const secondaryNavigation = [
        {name: 'All-time', href: '#', current: true},
        {name: 'This Month', href: '#', current: false},
        {name: '6 Months Ago', href: '#', current: false},

    ]

    const [selectedReportType, setSelectedReportType] = useState<SelectInputItemType>(reportTypeList[0])
    const [statistics, setStatistics] = useState<ReportAggregateItemType[]>()
    const [summaries, setSummaries] = useState<ReportSummaryType[]>([])
    const handleSelectedReportType = (report: SelectInputItemType) => {
        setSelectedReportType(report)
        setReportType(report.name)
        setSelectedReportType(report)
    }

    const getStats = (stats: ReportStatType): ReportSummaryType[] => {
        return [
            {
                name: 'Total Loan Count',
                value: stats.totalLoanCount.toString() ?? '0',
                change: '0%',
                changeType: 'positive'
            },
            {
                name: 'Transaction Value',
                value: formatAmount(stats.totalTransactionValue.toString(), 'GHS', true, '0.00a'),
                change: '0%',
                changeType: 'positive'
            },
            {name: 'Customers', value: stats.totalCustomers.toString(), change: '0%', changeType: 'positive'},
            {name: 'Lenders', value: stats.totalLenders.toString(), change: '0%', changeType: 'positive'},
            {name: 'Agents', value: stats.totalAgents.toString(), change: '0%', changeType: 'positive'}
        ];
    }

    useEffect(() => {
        prepareReports();
    }, [])


    const prepareReports = () => {
        setSelectedReportType(reportTypeList[0])
        fetchReports()
    }

    const fetchReports = (params: string = '') => {
        listReports(params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {stats, aggregates} = feedback.data
                    setSummaries(getStats(stats))
                    const data = getMonthOnMonthAnalysis(aggregateReportData(aggregates))
                    setStatistics(data)
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const getMonthOnMonthAnalysis = (aggregates: ReportAggregateType[]) => {
        console.log(aggregates)
        const comparisons = [];
        for (let i = 0; i < aggregates.length; i += 2) {
            if (i + 1 < aggregates.length) {
                const comparisonResult = compareMonthlyData(aggregates[i], aggregates[i + 1]);
                comparisons.unshift(comparisonResult);
            }
        }

        return comparisons;
    }

    const aggregateReportData = (aggregates: ReportAggregateType[]) => {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();

        const aggregatedData = [];
        for (let i = 0; i < 6; i++) {
            const monthIndex = (currentMonthIndex - i + 12) % 12;
            const monthName = new Date(currentDate.getFullYear(), monthIndex, 1).toLocaleString('en-us', {month: 'short'});

            const monthAggregate = aggregates.find(month => month.name === monthName) || {
                transactionVolume: 0,
                transactionValue: 0,
                loanVolume: 0,
                loanValue: 0
            };
            aggregatedData.unshift({
                name: monthName,
                ...monthAggregate
            });
        }

        return aggregatedData;
    };

    return (
        <main>
            <div className="relative isolate overflow-hidden">
                <header className="sm:pb-4">
                    <div
                        className="mx-auto flex flex-wrap items-center gap-6 sm:flex-nowrap sm:px-6 lg:px-8 pb-4">
                        <h1 className="text-base font-semibold leading-7 text-gray-900 capitalize">{`${reportType} Report`}</h1>
                        <div className="flex lg:ml-auto rounded-md text-sm">
                            <SmallCardOptions selected={selectedReportType}
                                              setSelected={handleSelectedReportType}
                                              data={reportTypeList}/>
                        </div>
                    </div>
                </header>

                {reportType === 'analytics' && <>
                    <header className="pb-2 pt-0 sm:pb-4">
                        <div
                            className="mx-auto flex max-w-full flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                            <h1 className="text-base font-semibold leading-7 text-gray-900">Statistics</h1>
                            <div
                                className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
                                {secondaryNavigation.map((item) => (
                                    <a key={item.name} href={item.href}
                                       className={item.current ? 'text-indigo-600' : 'text-slate-300'}>
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </header>

                    <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
                        <dl className="mx-auto grid max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:px-2 xl:px-0">
                            {summaries?.map((summary, index) => (
                                <div
                                    key={summary.name}
                                    className={`${index !== 0 ? 'sm:border-l' : ''}
                            flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8`}
                                >
                                    <dt className="text-sm font-medium leading-6 text-gray-500">{summary.name}</dt>
                                    <dd
                                        className={`${summary.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700'}
                                text-xs font-medium`}
                                    >
                                        {summary.change}
                                    </dd>
                                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900 capitalize">
                                        {summary.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div
                        className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-8 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                            style={{
                                clipPath:
                                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                            }}
                        />
                    </div>
                </>}
            </div>
            {reportType === 'analytics' && <AnalyticsContent statistics={statistics}/>}
            {reportType === 'loans' && <LoanContent downloadable={true} filter={true}/>}
            {reportType === 'transactions' && <TransactionList downloadable={true}/>}
        </main>
    )
}

export default ReportsOverview
