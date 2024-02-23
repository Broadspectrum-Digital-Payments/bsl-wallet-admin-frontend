import React, {useEffect} from 'react';
import Button from "@/components/forms/Button";
import {IFilterWrapper} from "@/utils/interfaces/IFilterWrapper";

const FilterWrapper: React.FC<IFilterWrapper> = ({onSubmit, onReset, hasError, children}) => {
    const handleSubmitButtonClicked: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        onSubmit(true)
    }

    const handleResetButtonClicked: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        onReset(true)
    }

    useEffect(() => {
    }, [hasError])

    return (
        <div className="h-full border-b rounded pb-5">
            <form id="filter" onSubmit={handleSubmitButtonClicked} onReset={handleResetButtonClicked}>
                {children}
                <div className="flex items-center justify-end gap-x-5">
                    <div className="flex">
                        <Button buttonType="reset" styleType="tertiary" customStyles="rounded">
                            <span className="font-semibold">Reset</span>
                        </Button>
                        <Button buttonType="submit" styleType="primary"
                                customStyles="ml-2 px-5 py-2 rounded truncate"
                                disabled={hasError}
                        >
                            <span className="text-sm">Apply Filter</span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default FilterWrapper;
