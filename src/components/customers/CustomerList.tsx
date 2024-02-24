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
import TextInput from "@/components/forms/TextInput";
import Svg from "@/components/Svg";

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


    const {customers, setCustomers, setCustomer} = useCustomerStore()

    const [searchNameTerm, setSearchNameTerm] = useState('');
    const [searchPhoneTerm, setSearchPhoneTerm] = useState('');



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
                console.log('error: ', error)
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


    const [filterQueryString, setFilterQueryString] = useState<string>('type=user&pageSize=10');



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

    const handleSearchName = (search: string) => {

        setSearchNameTerm(search)

        fetchCustomers(`type=user&name=${search}`)
    }

    const handleSearchPhoneNumber = (search: string) => {

        setSearchPhoneTerm(search)

        fetchCustomers(`type=user&phoneNumber=${search}`)
    }

    return (
        <div>
            <div className="w-full ml-auto mb-0 flex">
            <div className="mr-4">
                <TextInput label="" id="search" name="search" type="search" placeholder="Search Name" autoComplete=""
                           value={searchNameTerm}
                           onInputChange={(e) => handleSearchName(e.target.value)}
                           customInputClasses="grid ml-auto mr-4">
                    {{
                        left: <Svg name="search.svg" customClasses="ml-2"/>
                    }}
                </TextInput>
            </div>
                <TextInput label="" id="search" name="search" type="search" placeholder="Search Phone" autoComplete=""
                           value={searchPhoneTerm}
                           onInputChange={(e) => handleSearchPhoneNumber(e.target.value)}
                           customInputClasses="grid ml-auto ml-4">
                    {{
                        left: <Svg name="search.svg" customClasses="ml-2"/>
                    }}
                </TextInput>
            </div>


            <Table onButtonClick={() => {
            }}>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {customers && customers.data.map((customer) => (
                                <tr key={customer.ghanaCardNumber}>
                                    <TData label={customer.ghanaCardNumber}
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