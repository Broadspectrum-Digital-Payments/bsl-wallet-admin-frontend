import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Badge from "@/components/Badge";
import {useAdminStore} from "@/store/AdminStore";
import {extractPaginationData} from "@/utils/helpers";
import {useLenderStore} from "@/store/LenderStore";
import {listLenders} from "@/api/lenders";

const LenderList: React.FC = () => {
    const router = useRouter();

    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Phone', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]
    const {lenders, setLenders} = useLenderStore()
    const {authenticatedAdmin} = useAdminStore()

    useEffect(() => {
        fetchLenders()
    }, [])

    const fetchLenders = (params: string = '') => {
        listLenders(authenticatedAdmin?.bearerToken, params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {users, meta} = feedback.data
                    const data = users

                    const pagination = extractPaginationData(meta)
                    if (setLenders) setLenders({pagination, data});
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const handlePrevious = () => {
        if (lenders) {
            const {pagination} = lenders
            if (pagination.currentPage) {
                const previousPageNumber = pagination.currentPage - 1
                return pagination.firstPage ? null : fetchLenders(`perPage=${pageOption.value}&page=${previousPageNumber}`)
            }
        }
    }
    const handleNext = () => {
        if (lenders) {
            const {pagination} = lenders
            if (pagination.currentPage) {
                const nextPageNumber = pagination.currentPage + 1
                return pagination.lastPage ? null : fetchLenders(`perPage=${pageOption.value}&page=${nextPageNumber}`)
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

    const handleAddLender = () => {
        return router.push('lenders/create');
    }

    return (
        <>
            <div>
                <Table buttonText="Add Lender" onButtonClick={handleAddLender}>
                    {{
                        headers: tableHeaders,
                        body:
                            <>
                                {lenders && lenders.data.map((lender) => (
                                    <tr key={lender.externalId}>
                                        <TData label={lender.externalId}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={lender.name}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={lender.phoneNumber}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label=""
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                            <Badge text={lender.status ?? ''} customClasses="capitalize"/>
                                        </TData>

                                        <TData label=""
                                               customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                            <Link
                                                className="text-indigo-600 hover:text-indigo-900"
                                                href={`/lenders/${lender.externalId}`}>
                                                View <span className="sr-only">, {lender.name}</span>
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
                    pagination={lenders?.pagination}
                />
            </div>
        </>
    )
}

export default LenderList