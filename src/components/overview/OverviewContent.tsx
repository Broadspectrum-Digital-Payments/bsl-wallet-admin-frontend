import {getGreeting} from "@/utils/helpers";
import React, {useEffect} from "react";
import {useUserStore} from "@/store/UserStore";
import OverviewCardsContainer from "@/components/overview/OverviewCardsContainer";
import PageInfoCard from "@/components/PageInfoCard";
import {useDashboardStore} from "@/store/DashboardStore";

const OverviewContent = () => {
    const {user} = useUserStore();
    const {
        mainMenuItemsList,
        setActiveSidebarMenu,
        setPageInfo,
    } = useDashboardStore();

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

    return (
        <div className="flex flex-col">
            <div className="max-w-full">
                <div
                    className="grid max-w-full grid-rows-1 items-start gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    <PageInfoCard customClasses="lg:col-start-4"/>

                    <div className="sm:mx-0 lg:col-span-3 lg:row-span-3 lg:row-end-3 mb-8">
                        <div className="">
                            <div className=" flex flex-col mb-10">
                                <span className="font-semibold">{`${getGreeting()}, ${user?.firstName}!`}</span>
                                <span className="text-xs text-gray-500">NADABS INC.</span>
                            </div>

                            <div className=" flex flex-col">
                                <span>Getting Started</span>
                                <span className="text-xs text-gray-500">
                                  Complete these simple steps to get started with managing your fleet
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto min-h-full flex items-end justify-end">
                {/*<OverviewCardsContainer/>*/}
            </div>
        </div>
    );
};

export default OverviewContent