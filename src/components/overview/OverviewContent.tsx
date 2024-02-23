import {getGreeting, plotGraphData, splitName} from "@/utils/helpers";
import React, {useEffect, useState} from "react";
import OverviewCardsContainer from "@/components/overview/OverviewCardsContainer";
import PageInfoCard from "@/components/PageInfoCard";
import {useDashboardStore} from "@/store/DashboardStore";
import Card from "@/components/Card";
import ReAreaGraph from "@/components/charts/ReAreaGraph";
import {TransactionGraphDataType} from "@/utils/types/TranasctionGraphDataType";
import {useTransactionStore} from "@/store/TransactionStore";
import ReBarGraph from "@/components/charts/ReBarGraph";
import {useAdminStore} from "@/store/AdminStore";

const OverviewContent = () => {
    const [activeNav, setActiveNav] = useState<string>('collections');
    const {authenticatedAdmin, firstTimeLogin} = useAdminStore();
    const {
        mainMenuItemsList,
        setActiveSidebarMenu,
        setPageInfo,
    } = useDashboardStore();

    const {transactionSummary} = useTransactionStore()

    useEffect(() => {
        setOverviewDashboardProps();
    }, []);

    const setOverviewDashboardProps = () => {
        if (setActiveSidebarMenu) setActiveSidebarMenu(mainMenuItemsList[0]);
        if (setPageInfo)
            setPageInfo({
                title: "Help Center",
                description:
                    "This is your dashboard overview page. It is a summary of how your customers are performing and how your accounts are doing.",
            });
    };

    const getDataOptions = [
        {key: 'collections', color: '#652D90'},
        {key: 'disbursements', color: '#59D3D4'}
    ];

    const {volume, value} = plotGraphData(transactionSummary)
    const barGraphData: TransactionGraphDataType[] = volume
    const areaGraphData: TransactionGraphDataType[] = value

    return (
        <div className="flex flex-col">
            <div className="max-w-full">
                <div
                    className="grid max-w-full grid-rows-1 items-start gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    <PageInfoCard customClasses="lg:col-start-4"/>

                    <div className="sm:mx-0 lg:col-span-3 lg:row-span-3 lg:row-end-3 mb-8">
                        <div className="">
                            <div className=" flex flex-col mb-10">
                                <span className="font-semibold capitalize">{`${getGreeting()}, ${splitName(authenticatedAdmin?.name ?? '')[0]}!`}</span>
                                <span className="text-xs text-gray-500">Welcome to your dashboard!</span>
                            </div>

                            <div className=" flex flex-col">
                                <span>Getting Started</span>
                                <span className="text-xs text-gray-500">
                                  Complete these simple steps to get started with managing your dashboard
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto min-h-full flex flex-col items-end justify-end">
                <OverviewCardsContainer/>
            </div>

            {firstTimeLogin && <div className="flex sm:flex-col md:flex-row lg:flex gap-5">
                <Card
                    customStyles={`lg:w-2/3 flex flex-col border border-gray-200 w-full rounded-2xl h-[417px] px-[40px] p-3 my-5`}>
                    <div className="flex flex-col h-full">
                        <ReBarGraph data={barGraphData} dataOptionSet={getDataOptions} options={{tooltip: true}}/>
                    </div>
                </Card>

                <Card
                    customStyles="lg:w-1/3 flex flex-col border border-gray-200 w-full rounded-2xl my-5 h-[417px]">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between w-full items-center mt-5 mx-5">
                            <h5 className="flex text-md md:font-medium leading-6">Total Values</h5>
                        </div>

                        <div className="flex flex-col mx-5">
                            <div className="flex-grow pt-[80px]">
                                <ReAreaGraph data={areaGraphData} dataKey={activeNav} customClasses="flex-grow"/>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>}
        </div>
    );
};

export default OverviewContent