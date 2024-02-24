import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import {extractPaginationData, formatAmount, prepareFilterQueryString} from "@/utils/helpers";
import {listLoans} from "@/api/loan";
import {useLoanStore} from "@/store/LoanStore";
import Link from "next/link";
import AgentFilter from "@/components/agents/AgentFilter";
import FilterWrapper from "@/components/FilterWrapper";
import {FilterFormDataType} from "@/utils/types/FilterFormDataType";
import Badge from "@/components/Badge";

const LoanList: React.FC = () => {
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Amount', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Repayment Duration', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Repayment Amount', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Amount Paid', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Date Created', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]
    const {loans, setLoans, setLoan, loading, setLoading} = useLoanStore()

    const [filterQueryString, setFilterQueryString] = useState<string>('pageSize=10');
    const [resetFilter, setResetFilter] = useState<boolean>(false);
    const [submitFilter, setSubmitFilter] = useState<boolean>(false);
    const [formData, setFormData] = useState<FilterFormDataType>({
        externalId: '',
        startDate: '',
        endDate: '',
        status: ''
    });
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        fetchLoans(filterQueryString)
    }, [])

    const fetchLoans = (params: string = '') => {
        listLoans(params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {data, meta} = feedback
                    const pagination = extractPaginationData(meta)
                    if (setLoans) setLoans({pagination, data})
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const handleFilterSubmitButtonClicked = (submit: boolean) => {
        setSubmitFilter(submit)
        const queryString = prepareFilterQueryString(formData, filterQueryString)
        setFilterQueryString(queryString)
        fetchLoans(queryString)
    }

    const handleResetFilter = (reset: boolean) => {
        setResetFilter(reset)
        return fetchLoans('pageSize=10')
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

    const handlePrevious = () => {
        if (loans) {
            const {pagination} = loans
            if (pagination.currentPage) {
                const previousPageNumber = pagination.currentPage - 1
                return pagination.firstPage ? null : fetchLoans(`pageSize=${pageOption.value}&page=${previousPageNumber}`)
            }
        }
    }
    const handleNext = () => {
        if (loans) {
            const {pagination} = loans
            if (pagination.currentPage) {
                const nextPageNumber = pagination.currentPage + 1
                return pagination.lastPage ? null : fetchLoans(`pageSize=${pageOption.value}&page=${nextPageNumber}`)
            }
        }
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
            <FilterWrapper onSubmit={handleFilterSubmitButtonClicked} onReset={handleResetFilter}
                           hasError={hasError}>
                <AgentFilter
                    submit={submitFilter}
                    reset={resetFilter}
                    onChange={handleFilterChange}
                    hasError={hasError}
                    setHasError={handleFilterError}
                />
            </FilterWrapper>

            <Table>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {loans.data.map((loan) => (
                                <tr key={loan.externalId}>
                                    <TData label={loan.externalId}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={formatAmount(loan.amount)}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={formatAmount(loan.amount)}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label={formatAmount(loan.amount)}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label={formatAmount(loan.amount)}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        <Badge text={loan.status ?? ''} customClasses="capitalize"/>
                                    </TData>
                                    <TData label={loan.createdAt}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>

                                    <TData label=""
                                           customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                        <Link
                                            onClick={() => setLoan(loan)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                            href={`/loans/${loan.externalId}`}>
                                            Details <span className="sr-only">, {loan.externalId}</span>
                                        </Link>
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
                pagination={loans?.pagination}
            />
        </div>
    )
}

export default LoanList