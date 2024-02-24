import React, {useEffect, useState} from 'react';
import DatePicker from "@/components/forms/DatePicker";
import ListBox from "@/components/forms/ListBox";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import {DateTime} from "luxon";
import {now} from "d3-timer";
import {ITransactionFilter} from "@/utils/interfaces/ITransactionFilter";
import {FilterFormDataType} from "@/utils/types/FilterFormDataType";

const LoanFilter: React.FC<ITransactionFilter> = ({
                                                     onChange,
                                                     submit,
                                                     reset,
                                                     hasError,
                                                     setHasError
                                                 }) => {
    const [formData, setFormData] = useState<FilterFormDataType>({
        externalId: '',
        startDate: '',
        endDate: '',
        status: ''
    });

    const dropdownData: IListBoxItem[] = [
        {label: 'select status', value: 'select status'},
        {label: 'submitted', value: 'submitted'},
        {label: 'approved', value: 'approved'},
        {label: 'completed', value: 'completed'},
    ]

    const [filterHasError, setFilterHasError] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<IListBoxItem>(dropdownData[0]);
    const [disableExternalIdInput, setDisableExternalIdInput] = useState<boolean>(false);
    const [disableStatusInput, setDisableStatusIdInput] = useState<boolean>(false);
    const [disableDateInput, setDisableDateInput] = useState<boolean>(false);
    const [startDateError, setStartDateError] = useState<string>('');
    const [endDateError, setEndDateError] = useState<string>('');

    useEffect(() => {
        if (reset) handleResetFilter()
        if (filterHasError) setHasError(filterHasError)
    }, [submit, reset, filterHasError])


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const {name, value} = event.target;
        handleDisableOtherInputFields(value)
        const data = {...formData, [name]: value}
        setFormData(data);
        onChange(data)
    };

    const handleDisableOtherInputFields = (value: string) => {
        let inputState = false
        if (value.length > 0) inputState = true
        setDisableStatusIdInput(inputState)
        setDisableDateInput(inputState)
    };

    const handleDateSelected = (name: string, date: Date) => {
        try {
            const formattedDate = new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).format(date);

            const parsedDate = DateTime.fromFormat(formattedDate, 'dd/MM/yyyy');
            if (parsedDate.isValid) {
                const formattedDate = parsedDate.toFormat('dd-MM-yyyy')
                const data = {...formData, [name]: formattedDate}
                setFormData({...data});
                checkDateCombinations(name, formattedDate)
                setDisableExternalIdInput(true)
                if (!filterHasError) return onChange(data)
            }

        } catch (error) {
            console.error('Error parsing date string:', error);
        }
    };

    const checkDateCombinations = (type: string = 'startDate', value: string = '') => {
        const {startDate, endDate} = formData;
        const formattedValue = DateTime.fromFormat(value, 'dd-MM-yyyy')
        if (type === 'startDate' && endDate && DateTime.fromFormat(endDate, 'dd-MM-yyyy') < formattedValue) {
            setStartDateError('Start date cannot be after end date');
            setFilterHasError(true)
        } else if (type === 'endDate' && startDate && DateTime.fromFormat(startDate, 'dd-MM-yyyy') > formattedValue) {
            setEndDateError('End date cannot be before start date');
            setFilterHasError(true)
        } else {
            resetDateErrors()
            setFilterHasError(false)
        }
    };

    const resetDateErrors = () => {
        setStartDateError('')
        setEndDateError('')
    }
    const handleSetStatusFilter = (option: IListBoxItem) => {
        setStatusFilter(option)
        const data = {...formData, ['status']: option.value}
        setFormData(data);
        onChange(data)
        setDisableExternalIdInput(true)
    };

    const handleResetFilter = () => {
        setStatusFilter(dropdownData[0])
        handleDateSelected('startDate', new Date())
        handleDateSelected('endDate', new Date())
        setDisableStatusIdInput(false)
        setDisableDateInput(false)
        setDisableExternalIdInput(false)
        setFormData({
            externalId: '',
            startDate: '',
            endDate: '',
            status: ''
        })
        resetDateErrors()
    }

    return (
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-3 mb-2">
            <div className="grid min-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 sm:col-span-full">
                <div className="sm:col-span-4">
                    <label htmlFor="startDate"
                           className="block text-sm font-medium leading-6 text-gray-900">
                        Start Date
                    </label>
                    <div className="mt-2">
                        <div id="startDate"
                             className={`flex flex-col transition-opacity opacity-100 duration-500 ease-in-out`}>
                            <DatePicker minDate={new Date('2023/07/31')}
                                        selectedDate={new Date(formData.startDate ?? now().toString())}
                                        setSelectedDate={(date: Date) => handleDateSelected('startDate', date)}
                                        disabled={disableDateInput}
                                        error={startDateError}
                            />
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-4">
                    <label htmlFor="endDate"
                           className="block text-sm font-medium leading-6 text-gray-900">
                        End Date
                    </label>
                    <div className="mt-2">
                        <div id="endDate"
                             className={`flex flex-col transition-opacity opacity-100 duration-500 ease-in-out`}>
                            <DatePicker
                                minDate={new Date('2023/07/31')}
                                selectedDate={new Date(formData.endDate ?? now().toString())}
                                setSelectedDate={(date: Date) => handleDateSelected('endDate', date)}
                                disabled={disableDateInput}
                                error={endDateError}
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-4">
                    <h5 className="block text-sm font-medium leading-6 text-gray-900">
                        Status
                    </h5>
                    <ListBox
                        data={dropdownData}
                        customButtonClasses="p-2 px-3 capitalize truncate"
                        customClasses="mt-2"
                        optionSelected={statusFilter}
                        setOptionSelected={handleSetStatusFilter}
                        disableFirstKey={true}
                        disableButton={disableStatusInput}
                    />
                </div>
            </div>
        </div>
    );
};
export default LoanFilter;
