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
    const getPaginationSize = () => {
        if (pagination) {
            const {size, totalElements} = pagination;
            return size > totalElements ? totalElements : size;
        } else
            return 10;
    };

    const getCaretColor = (page: string) => {
        if (page === 'first') {
            return pagination?.firstPage ? '#d1d5db' : '#4F4F4F';
        } else if (page === 'last') {
            return pagination?.lastPage ? '#d1d5db' : '#4F4F4F';
        }
        return '#4F4F4F';
    }

    const getInitialOffset = () => {
        if (pagination) {
            const {offset} = pagination
            return offset === 0 ? 1 : offset + 1
        } else
            return 0;
    }

    const getFinalOffset = () => {
        if (pagination) {
            const {size, offset, totalElements, pageNumber} = pagination
            const finalOffset = size * pageNumber
            return offset === 0 ? getPaginationSize() : finalOffset > totalElements ? totalElements : finalOffset
        } else
            return 10;
    }

    return (
        <div className="flex items-center justify-between bg-white mt-3">
            <div className="flex flex-1 justify-between items-center sm:hidden">
                <div className="text-xs">
                    <span className="font-medium">{getInitialOffset()}</span> to <span
                    className="font-medium">{getFinalOffset()}</span> of{' '}
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
                        <span className="font-medium">{getInitialOffset()}</span> to <span
                        className="font-medium">{getFinalOffset()}</span> of{' '}
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