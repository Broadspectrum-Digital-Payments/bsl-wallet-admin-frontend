import React from 'react';
import Svg from "@/components/Svg";
import ListBox from "@/components/forms/ListBox";
import {IPagination} from "@/utils/interfaces/IPagination";

const Pagination: React.FC<IPagination> = ({
                                               handlePrevious,
                                               handleNext,
                                               pagination,
                                               pageOption,
                                               setPageOption,
                                               perPageOptions
                                           }) => {

    return (
        <div className="flex items-center justify-between bg-white mt-3">
            <div className="flex flex-1 justify-between items-center sm:hidden">
                <div className="text-xs">
                    <span className="font-medium">{pagination?.from}</span> to
                    <span className="font-medium">{pagination?.to}</span> of {' '}
                    <span className="font-medium">{pagination?.totalElements}</span>
                </div>

                <div className="flex">
                    <div onClick={() => handlePrevious} className="cursor-pointer border p-1 rounded mr-1">
                        <Svg name="caret-left.svg"/>
                    </div>
                    <div onClick={() => handleNext} className="cursor-pointer border p-1 rounded">
                        <Svg name="caret-right.svg"/>
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div className="flex items-center">
                    <p className="text-sm text-gray-700 font-semibold mr-3">
                        Show rows per page
                    </p>
                    <ListBox data={perPageOptions}
                             optionSelected={pageOption}
                             setOptionSelected={setPageOption}
                             customButtonClasses="p-2"
                    />
                </div>
                <div className="flex items-center">
                    <div className="text-xs mr-5">
                        <span className="font-medium">{pagination?.from}</span> to <span
                        className="font-medium">{pagination?.to}</span> of{' '}
                        <span className="font-medium">{pagination?.totalElements}</span>
                    </div>

                    <div onClick={handlePrevious}
                         className={`border p-1 rounded mr-1 ${pagination?.firstPage ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        <Svg name="caret-left.svg"/>
                    </div>
                    <div onClick={handleNext}
                         className={`border p-1 rounded ${pagination?.lastPage ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                        <Svg name="caret-right.svg"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pagination;