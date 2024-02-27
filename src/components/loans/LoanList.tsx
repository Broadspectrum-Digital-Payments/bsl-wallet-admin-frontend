import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import {extractPaginationData, prepareFilterQueryString} from "@/utils/helpers";
import {downloadLoans, listLoans, updateLoan} from "@/api/loan";
import {useLoanStore} from "@/store/LoanStore";
import Link from "next/link";
import FilterWrapper from "@/components/FilterWrapper";
import {FilterFormDataType} from "@/utils/types/FilterFormDataType";
import Badge from "@/components/Badge";
import SlideOverWrapper from "@/components/SlideOver";
import LoanSummary from "@/components/loans/LoanSummary";
import {LoanType} from "@/utils/types/LoanType";
import LoanRepaymentHistory from "@/components/loans/RepaymentHistory";
import {ILoanList} from "@/utils/interfaces/ILoanList";
import Alert from "@/components/Alert";
import LoanFilter from "@/components/loans/LoanFilter";
import LoanStats from "@/components/loans/LoanStats";
import {LoanStatItemType} from "@/utils/types/LoanStatItemType";
import {useLenderStore} from "@/store/LenderStore";
import {showLender} from "@/api/lenders";
import EmptyState from "@/components/EmptyState";

const LoanList: React.FC<ILoanList> = ({downloadable = false, filter = false, stats, passedParam = ''}) => {
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Amount', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        // {label: 'Repayment Duration', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Repayment Amount', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Interest', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Date Created', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]
    const {loans, setLoans, setLoan} = useLoanStore()

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
    const [slideOverOpen, setSlideOverOpen] = useState<boolean>(false);
    const [detailsActiveTab, setDetailsActiveTab] = useState<string>('summary');
    const [loanStats, setLoanStats] = useState<LoanStatItemType[]>([]);


    useEffect(() => {
        // fetchLoans(filterQueryString)
    }, [])

    const fetchLoans = (params: string = 'pageSize=10') => {
        let stringParams = params
        if (passedParam && params) {
            stringParams = `${passedParam}&${params}`
        } else if(passedParam) {
            stringParams = passedParam
        }

        listLoans(stringParams)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {

                    const {loans, meta} = feedback.data;
                    const pagination = extractPaginationData(meta)
                    if (setLoans) setLoans({pagination, data: loans})
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

    const handleViewLoanDetails = (loan: LoanType) => {
        setLoan(loan)
        setSlideOverOpen(true)
    }

    const handleSlideOverOpen = () => {
        setSlideOverOpen(!slideOverOpen)
        if (!slideOverOpen) setDetailsActiveTab('summary')
    }

    const loanDetailsTabs = [
        {name: 'summary', label: 'Loan Summary'},
        {name: 'history', label: 'Repayment History'}
    ]

    const handleTableButtonClicked = () => {
        return downloadLoans(filterQueryString)
    }

    const {loan} = useLoanStore()
    const {authenticatedLender, setLender, lender} = useLenderStore()

    const handleApproveLoan = () => {
        const lenderExternalId = authenticatedLender?.externalId ?? ''
        const loanExternalId = loan?.externalId ?? ''

        updateLoan(lenderExternalId, loanExternalId, {status: 'approved'})
            .then(async response => {
                if (response.status == 204) {

                    const currentLoans = loans.data.filter((submittedLoans: LoanType) => submittedLoans.externalId != loanExternalId)

                    const newPagination = loans.pagination;
                    newPagination.totalElements = newPagination.totalElements ? newPagination.totalElements - 1 : 0
                    newPagination.to = newPagination.to ? newPagination.to - 1 : 0

                    setLoans({
                        ...loans,
                        data: currentLoans,
                        pagination: newPagination
                    })

                    showLender(authenticatedLender.bearerToken, lenderExternalId).then(async response => {
                        if (response.status == 200) {
                            const feedback = await response.json()
                            setLender({...lender, availableBalance: feedback.data.availableBalance, actualBalance: feedback.data.actualBalance})
                        }
                    })
                    

                    setSlideOverOpen(!slideOverOpen)
                    setToastInfo({type: 'success', description: 'Loan Approved Successfully'})



                }else{
                    const feedback = await response.json()

                    setSlideOverOpen(!slideOverOpen)
                    setToastInfo({type: 'error', description: feedback.message})
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const handleRejectLoan = () => {
        const lenderExternalId = authenticatedLender?.externalId ?? ''
        const loanExternalId = loan?.externalId ?? ''

        updateLoan(lenderExternalId, loanExternalId, {status: 'declined'})
            .then(async response => {
                if (response.status == 204) {

                    const currentLoans = loans.data.filter((submittedLoans: LoanType) => submittedLoans.externalId != loanExternalId)

                    setLoans({
                        ...loans,
                        data: currentLoans
                    })

                    setSlideOverOpen(!slideOverOpen)
                    setToastInfo({type: 'success', description: 'Loan Rejected'})

                }else{
                    const feedback = await response.json()

                    setSlideOverOpen(!slideOverOpen)
                    setToastInfo({type: 'error', description: feedback.message})
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const [toastInfo, setToastInfo] = useState<{ type: string, description: string, }>({
        type: '',
        description: '',
    });

    return (
        <div>
            {stats && <LoanStats data={loanStats}/>}

            {toastInfo.description &&
                <Alert alertType={ toastInfo.type } description={toastInfo.description} customClasses="rounded p-2 mt-3 mb-1"/>}
            {filter && <FilterWrapper onSubmit={handleFilterSubmitButtonClicked} onReset={handleResetFilter}
                                      hasError={hasError}>
                <LoanFilter
                    submit={submitFilter}
                    reset={resetFilter}
                    onChange={handleFilterChange}
                    hasError={hasError}
                    setHasError={handleFilterError}
                />
            </FilterWrapper>}

            {loans.data.length ? (<div>

            <Table buttonText={downloadable ? 'Download' : ''} onButtonClick={handleTableButtonClicked}>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {
                                loans.data.map((loan) => (
                                <tr key={loan.externalId}>
                                    <TData label={loan.stan}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={loan.principalInGHS}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={loan.totalRepaymentAmountInGHS}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label={loan.interestInGHS}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        <Badge text={loan.status ?? ''} customClasses="capitalize"/>
                                    </TData>
                                    <TData label={loan.createdAt}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>

                                    <TData label=""
                                           customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                        <Link
                                            onClick={() => handleViewLoanDetails(loan)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                            href="">
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

            </div>) :

            <EmptyState/>}

            <SlideOverWrapper open={slideOverOpen} setOpen={handleSlideOverOpen}>
                <div className="border-b border-gray-200 bg-slate-800">
                    <div className="px-6">
                        <nav className="-mb-px flex space-x-6" x-descriptions="Tab component">
                            {loanDetailsTabs.map((tab) => (
                                <Link
                                    onClick={() => setDetailsActiveTab(tab.name)}
                                    key={tab.name}
                                    href=""
                                    className={`${detailsActiveTab === tab.name
                                        ? 'border-white text-white'
                                        : 'border-transparent text-gray-500 hover:border-gray-100 hover:text-gray-700'}
                                                                whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`
                                    }
                                >
                                    {tab.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
                {detailsActiveTab === 'summary' &&
                    <LoanSummary onApproveLoan={handleApproveLoan} onRejectLoan={handleRejectLoan}/>}
                {detailsActiveTab === 'history' && <LoanRepaymentHistory/>}

            </SlideOverWrapper>

        </div>
    )
}

export default LoanList