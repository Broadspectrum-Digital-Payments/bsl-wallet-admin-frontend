import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Link from "next/link";
import Badge from "@/components/Badge";
import {extractPaginationData, getError} from "@/utils/helpers";
import {useUserStore} from "@/store/UserStore";
import {listUsers} from "@/api/user";


const KycList: React.FC = () => {
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Type', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Ghana Card Number', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
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

    useEffect(() => {
        fetchUsers()
    }, [])

    const [error, setError] = useState<string | null>(null);
    const {users, setUsers} = useUserStore()

    const fetchUsers = (params: string = 'kycStatus=queued') => {
        listUsers(params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {users, meta} = feedback.data
                    const pagination = extractPaginationData(meta)
                    if (setUsers) setUsers({pagination, data: users});
                }
            })
            .catch((error) => {
                setError(getError(error))
            })
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
        <>
            <div>
                <Table onButtonClick={() => {
                }}>
                    {{
                        headers: tableHeaders,
                        body:
                            <>
                                {users && users.data.map((user) => (
                                    <tr key={user.externalId}>
                                        <TData label={user.externalId ?? ''}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={user.name ?? ''}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={user.type ?? ''}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell capitalize"/>
                                        <TData label={user.ghanaCardNumber ?? ''}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label=""
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">

                                            <Badge text={user.status ?? ''} customClasses="capitalize"/>

                                        </TData>

                                        <TData label=""
                                               customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">

                                            <Link
                                                className="text-indigo-600 hover:text-indigo-900"
                                                href={`/kyc/${user.externalId}`}>
                                                View <span className="sr-only">, {user.name}</span>
                                            </Link>
                                        </TData>
                                    </tr>
                                ))}
                            </>
                    }}
                </Table>
                <Pagination
                    perPageOptions={perPageOptions}
                    pagination={users?.pagination}
                    setPageOption={setPageOption}
                    pageOption={pageOption}/>
            </div>
        </>
    )
}

export default KycList