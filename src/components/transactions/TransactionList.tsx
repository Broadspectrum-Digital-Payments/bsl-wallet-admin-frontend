import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Badge from "@/components/Badge";
import {useTransactionStore} from "@/store/TransactionStore";
import {extractPaginationData, formatAmount} from "@/utils/helpers";
import {useAdminStore} from "@/store/AdminStore";
import {listTransactions} from "@/api/transaction";
import {FilterQueryType} from "@/utils/types/FilterQueryType";
import FilterWrapper from "@/components/FilterWrapper";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import {FilterFormDataType} from "@/utils/types/FilterFormDataType";

const TransactionList: React.FC = () => {
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Account Number', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Amount', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Balance Before', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Balance After', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Fee', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Created  At', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Description', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
    ]
    const [pageOption, setPageOption] = useState<IListBoxItem>({
        label: '10',
        value: '10'
    });
    const perPageOptions: IListBoxItem [] = [
        {label: '10', value: '10'},
        {label: '20', value: '20'},
    ]

    const {transactions, setTransactions} = useTransactionStore()
    const {authenticatedAdmin} = useAdminStore()

    useEffect(() => {
        fetchTransactions()
    }, [])

    const fetchTransactions = (params: string = '') => {
        listTransactions(authenticatedAdmin?.bearerToken, params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {data, meta} = feedback
                    const pagination = extractPaginationData(meta)
                    if (setTransactions) setTransactions({pagination, data});
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const handlePrevious = () => {
        if (transactions) {
            const {pagination} = transactions
            if (pagination.currentPage) {
                const previousPageNumber = pagination.currentPage - 1
                return pagination.firstPage ? null : fetchTransactions(`perPage=${pageOption.value}&page=${previousPageNumber}`)
            }
        }
    }
    const handleNext = () => {
        if (transactions) {
            const {pagination} = transactions
            if (pagination.currentPage) {
                const nextPageNumber = pagination.currentPage + 1
                return pagination.lastPage ? null : fetchTransactions(`perPage=${pageOption.value}&page=${nextPageNumber}`)
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

    const prepareFilterQueryString = (queryObject: FilterQueryType) => {
        const queryParams = filterQueryString.split('&')
            .map(param => param.split('='))
            .reduce((obj: Record<string, string>, [key, value]) => {
                if (key !== '' && value != undefined)
                    return {...obj, [key]: value};

                return obj;
            }, {});

        const {startDate, endDate, ...remainingParams} = queryParams;

        const mergedParams = {
            ...remainingParams,
            ...queryObject,
        };

        const filteredParams = Object.fromEntries(
            Object.entries(mergedParams).filter(([key, value]) => {
                return ![undefined, ''].includes(String(value));
            })
        );

        return Object.entries(filteredParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
    };

    const [filterQueryString, setFilterQueryString] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(true);

    const handleFilterSubmitButtonClicked = (submit: boolean) => {
        setSubmitFilter(submit)
        const queryString = prepareFilterQueryString(formData)
        fetchTransactions(queryString)
    }

    const handleResetFilter = (reset: boolean) => {
        setResetFilter(reset)
        return fetchTransactions()
    }

    const handleFilterChange = (data: FilterFormDataType) => {
        console.log(data)
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

    return (
        <>
            <div>
                <FilterWrapper onSubmit={handleFilterSubmitButtonClicked} onReset={handleResetFilter}
                               hasError={hasError}>
                    <TransactionFilter
                        submit={submitFilter}
                        reset={resetFilter}
                        onChange={handleFilterChange}
                        hasError={hasError}
                        setHasError={handleFilterError}
                    />
                </FilterWrapper>

                <Table onButtonClick={() => {
                }}>
                    {{
                        headers: tableHeaders,
                        body:
                            <>
                                {transactions && transactions.data.map((transaction) => (
                                    <tr key={transaction.externalId}>
                                        <TData label={transaction.externalId}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={transaction.accountNumber}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={`${formatAmount(transaction.amount)}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={`${formatAmount(transaction.balanceBefore)}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={`${formatAmount(transaction.balanceAfter)}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={`${transaction.fee}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={transaction.createdAt}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={transaction.description}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label=""
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                            <Badge text={transaction.status ?? ''} customClasses="capitalize"/>
                                        </TData>
                                    </tr>
                                ))}
                            </>
                    }}
                </Table>
                <Pagination
                    perPageOptions={perPageOptions}
                    setPageOption={setPageOption}
                    pageOption={pageOption}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    pagination={transactions?.pagination}
                />
            </div>
        </>
    )
}

export default TransactionList