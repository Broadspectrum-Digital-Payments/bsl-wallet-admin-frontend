import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import {extractPaginationData} from "@/utils/helpers";
import {listLoans} from "@/api/loan";
import {useLoanStore} from "@/store/LoanStore";
import Link from "next/link";

const LoansContent: React.FC = () => {
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Email', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]
    const {loans, setLoans, setLoan, loading, setLoading} = useLoanStore()

    const fetchLoans = (params: string = '') => {
        listLoans('', params)
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
            <Table>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {loans.data.map((loan) => (
                                <tr key={loan.externalId}>
                                    <TData label={loan.externalId}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={loan.externalId}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={loan.email}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label={loan.status}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>

                                    <TData label=""
                                           customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                        <a
                                            href="#"
                                            onClick={() => setLoan(loan)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Details<span className="sr-only">, {loan.externalId}</span>
                                        </a>
                                        <Link
                                            onClick={() => setLoan(loan)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                            href={`/agents/${loan.externalId}`}>
                                            View <span className="sr-only">, {loan.externalId}</span>
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

export default LoansContent