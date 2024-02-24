import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Link from "next/link";
import {extractPaginationData, getError, prepareFilterQueryString} from "@/utils/helpers";
import {listUsers} from "@/api/user";
import {useCustomerStore} from "@/store/CustomerStore";
import Badge from "@/components/Badge";
import {FilterFormDataType} from "@/utils/types/FilterFormDataType";
import FilterWrapper from "@/components/FilterWrapper";
import TransactionFilter from "@/components/transactions/TransactionFilter";

const CustomerList: React.FC = () => {
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Phone', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]


    useEffect(() => {
        fetchCustomers(filterQueryString)
    }, [])

    const [error, setError] = useState<string | null>(null);
    const {customers, setCustomers, setCustomer} = useCustomerStore()


    const fetchCustomers = (params: string = 'type=user') => {
        listUsers(params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {users, meta} = feedback.data
                    const pagination = extractPaginationData(meta)
                    console.log(feedback)
                    if (setCustomers) setCustomers({pagination, data: users});
                }
            })
            .catch((error) => {
                setError(getError(error))
            })
    }
    const handlePrevious = () => {
        if (customers) {
            const {pagination} = customers
            if (pagination.currentPage) {
                const previousPageNumber = pagination.currentPage - 1
                return pagination.firstPage ? null : fetchCustomers(`type=user&pageSize=${pageOption.value}&page=${previousPageNumber}`)
            }
        }
    }
    const handleNext = () => {
        if (customers) {
            const {pagination} = customers
            if (pagination.currentPage) {
                const nextPageNumber = pagination.currentPage + 1
                return pagination.lastPage ? null : fetchCustomers(`type=user&pageSize=${pageOption.value}&page=${nextPageNumber}`)
            }
        }
    }

    const [resetFilter, setResetFilter] = useState<boolean>(false);
    const [submitFilter, setSubmitFilter] = useState<boolean>(false);
    const [formData, setFormData] = useState<FilterFormDataType>({
        externalId: '',
        startDate: '',
        endDate: '',
        status: ''
    });
    const [filterQueryString, setFilterQueryString] = useState<string>('type=user&pageSize=10');
    const [hasError, setHasError] = useState<boolean>(true);

    const handleFilterSubmitButtonClicked = (submit: boolean) => {
        setSubmitFilter(submit)
        const queryString = prepareFilterQueryString(formData, filterQueryString)
        setFilterQueryString(queryString)
        fetchCustomers(queryString)
    }

    const handleResetFilter = (reset: boolean) => {
        setResetFilter(reset)
        return fetchCustomers()
    }

    const handleFilterChange = (data: FilterFormDataType) => {
        if (Object.values(data).every(value => value.trim() === '')) {
            return setHasError(true)
        } else {
            setFormData({...data})
            return setHasError(false)
        }
    }

    const handleFilterError = (error: boolean) => {
        setHasError(error)
    }

    const handleSetPageOption = (pageOption: IListBoxItem) => {
        const queryString = prepareFilterQueryString({pageSize: pageOption.value}, filterQueryString)
        setFilterQueryString(queryString);
        fetchCustomers(queryString)
        setPageOption(pageOption)
    }

    const [pageOption, setPageOption] = useState<IListBoxItem>({
        label: '10',
        value: '10'
    });

    const perPageOptions: IListBoxItem [] = [
        {label: '10', value: '10'},
        {label: '20', value: '20'},
    ]

    return (
        <div>
            {/*<FilterWrapper onSubmit={handleFilterSubmitButtonClicked} onReset={handleResetFilter}*/}
            {/*               hasError={hasError}>*/}
            {/*    <TransactionFilter*/}
            {/*        submit={submitFilter}*/}
            {/*        reset={resetFilter}*/}
            {/*        onChange={handleFilterChange}*/}
            {/*        hasError={hasError}*/}
            {/*        setHasError={handleFilterError}*/}
            {/*    />*/}
            {/*</FilterWrapper>*/}

            <Table onButtonClick={() => {
            }}>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {customers && customers.data.map((customer) => (
                                <tr key={customer.externalId}>
                                    <TData label={customer.externalId}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={customer.name}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={customer.phoneNumber}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label=""
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        <Badge text={customer.status ?? ''} customClasses="capitalize"></Badge>
                                    </TData>

                                    <TData label=""
                                           customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">

                                        <Link
                                            className="text-indigo-600 hover:text-indigo-900"
                                            href={`/customers/${customer.externalId}`}>
                                            View <span className="sr-only">, {customer.name}</span>
                                        </Link>
                                    </TData>
                                </tr>
                            ))}
                        </>
                }}
            </Table>
            <Pagination
                perPageOptions={perPageOptions}
                setPageOption={handleSetPageOption}
                pageOption={pageOption}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                pagination={customers?.pagination}
            />
        </div>
    )
}

export default CustomerList