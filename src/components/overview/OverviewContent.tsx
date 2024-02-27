import {plotGraphData} from "@/utils/helpers";
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
import Image from "next/image";

const OverviewContent = () => {
    const [activeNav, setActiveNav] = useState<string>('collections');
    const {authenticatedAdmin, firstTimeLogin} = useAdminStore();
    const {
        mainMenuItemsList,
        setActiveSidebarMenu,
        setPageInfo,
    } = useDashboardStore();
    const [showBalance, setShowBalance] = useState<boolean | null>(true);

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
        {key: 'loans', color: '#652D90'},
        {key: 'transactions', color: '#59D3D4'}
    ];

    const {volume, value} = plotGraphData(transactionSummary)
    const barGraphData: TransactionGraphDataType[] = volume
    const areaGraphData: TransactionGraphDataType[] = value

    const asterisks = (count: number) => Array.from({length: count}).map((_, index) => (
        <Image src="/assets/icons/asterisks-white.svg" alt="hidden" width={24} height={24}/>
    ));

    const handleToggleBalance = () => setShowBalance(!showBalance);

    return (
        <div className="flex flex-col">
            <div className="max-w-full">
                <div
                    className="grid max-w-full grid-rows-1 items-start gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    <PageInfoCard customClasses="lg:col-start-4"/>

                    <div className="sm:mx-0 lg:col-span-3 lg:row-span-3 lg:row-end-3 mb-8">
                        <div>
                            <div className="border rounded-lg bg-slate-700 lg:w-1/3 md:w-2/3 shadow-xl py-5 h-40"
                                 style={{
                                     backgroundImage: 'url("/assets/images/balance.png")',
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center',
                                     backgroundRepeat: 'no-repeat'
                                 }}>
                                <div className="flex flex-col justify-center text-white px-6 w-full gap-y-3">
                                    <div className="flex items-center gap-x-4 mt-5">
                                        <Image src="/assets/icons/wallet.svg" alt="wallet" width={39} height={39}/>
                                        <div
                                            className="font-medium leading-6 text-xl capitalize">{authenticatedAdmin?.name}</div>
                                    </div>
                                    <div className="flex justify-between gap-x-4 mt-7">
                                        <h5 className="font-medium leading-6 flex text-xl font-semibold">
                                            {showBalance ? `GHS ${authenticatedAdmin?.availableBalance}` : asterisks(6)}
                                        </h5>
                                        <div className="flex justify-center items-center cursor-pointer"
                                             onClick={handleToggleBalance}>
                                            {showBalance ?
                                                <Image src="/assets/icons/eye-slash-white.svg" alt="eye-opened"
                                                       height={39}
                                                       width={39} style={{width: 'auto', height: 39}}/>
                                                : <Image src="/assets/icons/eye-opened-white.svg" alt="eye-slash"
                                                         height={39}
                                                         width={39} style={{width: 'auto', height: 39}}/>}
                                        </div>
                                    </div>
                                </div>
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