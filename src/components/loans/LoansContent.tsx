import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import LoanStats from "@/components/loans/LoanStats";

const LoansContent: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [selectedLoan, setSelectedLoan] = useState<{
        externalId: string,
        name: string,
        email: string,
        status: string,
    }>({
        externalId: '',
        name: '',
        email: '',
        status: '',
    });

    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Email', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]
    const loans = [
        {externalId: 'bhjsdhvsg', name: 'Lindsay Walton', email: 'lindsay.walton@example.com', status: 'Active'},
        {externalId: 'ajhvskdaj', name: 'Joana Mensah', email: 'joana.walton@example.com', status: 'Inactive'}
    ]

    const handlePrevious = () => {
        // if (collections) {
        //     const {pagination} = collections
        //     const previousPageNumber = pagination.pageNumber - 1
        //     return pagination.firstPage ? null : getCollectionTransactions(`rows=${pageOption.value}&pageNumber=${previousPageNumber}`)
        // }
    }
    const handleNext = () => {
        // if (collections) {
        //     const {pagination} = collections
        //     const nextPageNumber = pagination.pageNumber + 1
        //     return pagination.lastPage ? null : getCollectionTransactions(`rows=${pageOption.value}&pageNumber=${nextPageNumber}`)
        // }
    }

    const [pageOption, setPageOption] = useState<IListBoxItem>({
        label: '10',
        value: '10'
    });

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const perPageOptions: IListBoxItem [] = [
        {label: '10', value: '10'},
        {label: '20', value: '20'},
    ]

    const handleOpenAdminModal = () => {
        setModalOpen(true)
    }

    const handleAddAdmin = () => {
        setModalOpen(false)
    }

    const handleShowLoanDetails = (loan: {
        externalId: string;
        name: string;
        email: string;
        status: string;
    }) => {
        setSelectedLoan(loan);
    }

    return (
        <div>
            <Table>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {loans.map((loan) => (
                                <tr key={loan.externalId}>
                                    <TData label={loan.externalId}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={loan.name}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={loan.email}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label={loan.status}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>

                                    <TData label=""
                                           customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                        <a
                                            href="#"
                                            onClick={() => handleShowLoanDetails(loan)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Details<span className="sr-only">, {loan.name}</span>
                                        </a>
                                    </TData>
                                </tr>
                            ))}
                        </>
                }}
            </Table>

            <Pagination
                perPageOptions={perPageOptions}
                setPageOption={setPageOption}
                pageOption={pageOption}/>
        </div>
    )
}

export default LoansContent