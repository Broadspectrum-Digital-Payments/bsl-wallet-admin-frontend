import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Badge from "@/components/Badge";
import {useTransactionStore} from "@/store/TransactionStore";
import {extractPaginationData, formatAmount, prepareFilterQueryString} from "@/utils/helpers";
import {useAdminStore} from "@/store/AdminStore";
import {downloadTransactions, listTransactions} from "@/api/transaction";
import {FilterQueryType} from "@/utils/types/FilterQueryType";
import FilterWrapper from "@/components/FilterWrapper";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import {FilterFormDataType} from "@/utils/types/FilterFormDataType";
import Link from "next/link";
import {TransactionType} from "@/utils/types/TransactionType";
import SlideOverWrapper from "@/components/SlideOver";
import TransactionDetails from "@/components/transactions/TransactionDetails";
import {ITransactionList} from "@/utils/interfaces/ITransactionList";
import {downloadLoans} from "@/api/loan";

const TransactionList: React.FC<ITransactionList> = ({downloadable = false}) => {
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
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
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
        fetchTransactions(filterQueryString)
    }, [])

    const fetchTransactions = (params: string = '') => {
        listTransactions(authenticatedAdmin?.bearerToken, params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {data, meta} = feedback
                    const pagination = extractPaginationData(meta)
                    if (setTransactions) setTransactions({pagination, data})
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
                return pagination.firstPage ? null : fetchTransactions(`pageSize=${pageOption.value}&page=${previousPageNumber}`)
            }
        }
    }
    const handleNext = () => {
        if (transactions) {
            const {pagination} = transactions
            if (pagination.currentPage) {
                const nextPageNumber = pagination.currentPage + 1
                return pagination.lastPage ? null : fetchTransactions(`pageSize=${pageOption.value}&page=${nextPageNumber}`)
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
    const [filterQueryString, setFilterQueryString] = useState<string>('pageSize=10');
    const [hasError, setHasError] = useState<boolean>(true);

    const {setTransaction, transaction} = useTransactionStore()

    const handleFilterSubmitButtonClicked = (submit: boolean) => {
        setSubmitFilter(submit)
        const queryString = prepareFilterQueryString(formData, filterQueryString)
        setFilterQueryString(queryString)
        fetchTransactions(queryString)
    }

    const handleResetFilter = (reset: boolean) => {
        setResetFilter(reset)
        return fetchTransactions()
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
        fetchTransactions(queryString)
        setPageOption(pageOption)
    }

    const [slideOverOpen, setSlideOverOpen] = useState<boolean>(false);


    const handleViewTransactionDetails = (transaction: TransactionType) => {
        setTransaction(transaction)
        setSlideOverOpen(true)
    }

    const handleSlideOverOpen = () => {
        setSlideOverOpen(!slideOverOpen)
    }

    const handleTableButtonClicked = () => {
        return downloadTransactions(filterQueryString)
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

                <Table buttonText={downloadable ? 'Download' : ''} onButtonClick={handleTableButtonClicked}>
                    {{
                        headers: tableHeaders,
                        body:
                            <>
                                {transactions && transactions.data.map((transaction) => (
                                    <tr key={transaction.externalId}>
                                        <TData label={transaction.stan}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={transaction.accountNumber}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={`${formatAmount(transaction.amount)}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={`${formatAmount(transaction.balanceBefore)}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={`${formatAmount(transaction.balanceAfter)}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={`${formatAmount(transaction.fee)}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={transaction.createdAt}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={transaction.description}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label=""
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                            <Badge text={transaction.status ?? ''} customClasses="capitalize"/>
                                        </TData>
                                        <TData label=""
                                               customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">

                                            {/*<Link*/}
                                            {/*    className="text-indigo-600 hover:text-indigo-900"*/}
                                            {/*    onClick={() => setTransaction(transaction)}*/}
                                            {/*    href={`/transactions/${transaction.externalId}`}>*/}
                                            {/*    View <span className="sr-only">, {transaction.amount}</span>*/}
                                            {/*</Link>*/}

                                            <Link
                                                onClick={() => handleViewTransactionDetails(transaction)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                                href="">
                                                View <span className="sr-only">, {transaction.externalId}</span>
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
                    pagination={transactions?.pagination}
                />
                <SlideOverWrapper dialogTitle="Transaction Details" open={slideOverOpen} setOpen={handleSlideOverOpen}>
                    <div className="flex lg:px-8 px-4 py-4">
                        <TransactionDetails transaction={transaction}></TransactionDetails>
                    </div>
                </SlideOverWrapper>
            </div>
        </>
    )
}

export default TransactionList