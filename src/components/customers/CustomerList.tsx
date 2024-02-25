import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Link from "next/link";
import {extractPaginationData, prepareFilterQueryString} from "@/utils/helpers";
import {listUsers} from "@/api/user";
import {useCustomerStore} from "@/store/CustomerStore";
import Badge from "@/components/Badge";
import TextInput from "@/components/forms/TextInput";
import Svg from "@/components/Svg";
import ListBox from "@/components/forms/ListBox";

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


    const dropdownData: IListBoxItem[] = [
        {label: 'select status', value: 'select status'},
        {label: 'created', value: 'created'},
        {label: 'activated', value: 'activated'},
        {label: 'deactivated', value: 'deactivated'},
        {label: 'All Status', value: ''},
    ]

    const [statusFilter, setStatusFilter] = useState<IListBoxItem>(dropdownData[0]);
    const [disableStatusInput, setDisableStatusIdInput] = useState<boolean>(false);


    const handleSetStatusFilter = (option: IListBoxItem) => {
        setStatusFilter(option)

        setDisableStatusIdInput(false)

        if (option.value === 'All Status') {
            fetchCustomers(`type=user`)
            return
        }

        fetchCustomers(`type=user&status=${option.value}`)
    };

    return (
        <div>
            <div className="grid min-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 sm:col-span-full">
                <div className="sm:col-span-3 mr-4">
                    <TextInput label="" id="search" name="search" type="search" placeholder="Search Name"
                               autoComplete=""
                               value={searchNameTerm}
                               onInputChange={(e) => handleSearchName(e.target.value)}
                               customInputClasses="grid ml-auto mr-4">
                        {{
                            left: <Svg name="search.svg" customClasses="ml-2"/>
                        }}
                    </TextInput>
                </div>

                <div className="sm:col-span-3 mr-4">
                    <TextInput label="" id="search" name="search" type="search" placeholder="Search Phone"
                               autoComplete=""
                               value={searchPhoneTerm}
                               onInputChange={(e) => handleSearchPhoneNumber(e.target.value)}
                               customInputClasses="grid ml-auto ml-4">
                        {{
                            left: <Svg name="search.svg" customClasses="ml-2"/>
                        }}
                    </TextInput>
                </div>

                <div className="sm:col-span-3">
                    <ListBox
                        data={dropdownData}
                        customButtonClasses="p-2 px-3 capitalize truncate"
                        customClasses="mt-2"
                        optionSelected={statusFilter}
                        setOptionSelected={handleSetStatusFilter}
                        disableFirstKey={true}
                        disableButton={disableStatusInput}
                    />
                </div>
            </div>


            <Table onButtonClick={() => {
            }}>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {customers && customers.data.map((customer) => (
                                <tr key={customer.externalId}>
                                    <TData label={customer.externalId}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={customer.name}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={customer.phoneNumber}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label=""
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        <Badge text={customer.status ?? ''} customClasses="capitalize"/>
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