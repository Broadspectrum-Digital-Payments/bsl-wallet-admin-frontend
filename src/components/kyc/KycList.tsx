import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Link from "next/link";
import Badge from "@/components/Badge";
import {extractPaginationData, formatDate, getError, prepareFilterQueryString} from "@/utils/helpers";
import {useUserStore} from "@/store/UserStore";
import {listUsers} from "@/api/user";
import FilterWrapper from "@/components/FilterWrapper";
import {FilterFormDataType} from "@/utils/types/FilterFormDataType";
import KycFilter from "@/components/kyc/KycFilter";

const KycList: React.FC = () => {
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Phone', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Type', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Ghana Card Number', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Date Created', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]

    const handlePrevious = () => {
        if (users) {
            const {pagination} = users
            if (pagination.currentPage) {
                const previousPageNumber = pagination.currentPage - 1
                return pagination.firstPage ? null : fetchUsers(`kycStatus=submitted&pageSize=${pageOption.value}&page=${previousPageNumber}`)
            }
        }
    }
    const handleNext = () => {
        if (users) {
            const {pagination} = users
            if (pagination.currentPage) {
                const nextPageNumber = pagination.currentPage + 1
                return pagination.lastPage ? null : fetchUsers(`kycStatus=submitted&pageSize=${pageOption.value}&page=${nextPageNumber}`)
            }
        }
    }

    useEffect(() => {
        fetchUsers(filterQueryString)
    }, [])

    const [error, setError] = useState<string | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);
    const [filterQueryString, setFilterQueryString] = useState<string>('kycStatus=submitted&pageSize=10');
    const [formData, setFormData] = useState<FilterFormDataType>({
        externalId: '',
        startDate: '',
        endDate: '',
        status: ''
    });
    const [resetFilter, setResetFilter] = useState<boolean>(false);
    const [submitFilter, setSubmitFilter] = useState<boolean>(false);

    const {users, setUsers} = useUserStore()

    const handleFilterSubmitButtonClicked = (submit: boolean) => {
        setSubmitFilter(submit)
        const queryString = prepareFilterQueryString(formData, filterQueryString)
        setFilterQueryString(queryString)
        fetchUsers(queryString)
    }

    const handleResetFilter = (reset: boolean) => {
        setResetFilter(reset)
        return fetchUsers('pageSize=10&kycStatus=submitted')
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

    const fetchUsers = (params: string = 'kycStatus=submitted') => {
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
        <div>
            <FilterWrapper onSubmit={handleFilterSubmitButtonClicked} onReset={handleResetFilter}
                           hasError={hasError}>
                <KycFilter
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
                            {users && users.data.map((user) => (
                                <tr key={user.externalId}>
                                    <TData label={user.externalId ?? ''}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={user.name ?? ''}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={user.phoneNumber ?? ''}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={user.type ?? ''}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell capitalize"/>
                                    <TData label={user.ghanaCardNumber ?? ''}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label=""
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        <Badge text={user.status ?? ''} customClasses="capitalize"/>
                                    </TData>
                                    <TData label={formatDate(user.createdAt)}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
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
                pageOption={pageOption}
                handlePrevious={handlePrevious}
                handleNext={handleNext}/>
        </div>
    )
}

export default KycList