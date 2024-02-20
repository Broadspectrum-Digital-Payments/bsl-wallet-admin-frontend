import React from 'react';
import {QuestionMarkCircleIcon} from "@heroicons/react/24/outline";
import {useDashboardStore} from "@/store/DashboardStore";
import {IPageInfo} from "@/utils/interfaces/IPageInfo";

const PageInfoCard: React.FC<IPageInfo> = ({customClasses = 'lg:col-start-3'}) => {
    const {pageInfo} = useDashboardStore()

    return (
        <>
            <div className={`lg:row-end-1 border rounded-lg bg-white ${customClasses}`}>
                <h2 className="sr-only">Page Info</h2>
                <div className="pb-8">
                    <dl className="flex flex-wrap">
                        <div className="flex-auto px-6 pt-6">
                            <dt className="text-sm font-semibold leading-6 text-red-400 flex items-center">
                                <QuestionMarkCircleIcon className="h-5 w-5 mr-1"/>
                                {pageInfo.title}
                            </dt>
                            <dd className="mt-2 leading-4 text-gray-700 text-sm">
                                {pageInfo.description}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    );
};

export default PageInfoCard;
