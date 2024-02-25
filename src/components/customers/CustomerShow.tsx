import React, {ChangeEvent, useEffect, useState} from 'react'
import TextInput from "@/components/forms/TextInput";
import {useParams} from "next/navigation";
import Button from "@/components/forms/Button";
import Loader from "@/components/Loader";
import {useCustomerStore} from "@/store/CustomerStore";
import {useAdminStore} from "@/store/AdminStore";
import {listUserTransactions, showUser} from "@/api/user";
import CustomSelectInput from "@/components/forms/CustomSelectInput";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import {extractPaginationData, formatAmount, isObjectEmpty, prepareFilterQueryString} from "@/utils/helpers";
import {updateUser} from "@/api/user";
import Toast from "@/components/Toast";
import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Badge from "@/components/Badge";
import Link from "next/link";
import Pagination from "@/components/table/Pagination";
import {listTransactions} from "@/api/transaction";
import EmptyState from "@/components/EmptyState";

import SlideOverWrapper from "@/components/SlideOver";
import {TransactionType} from "@/utils/types/TransactionType";
import TransactionDetails from "@/components/transactions/TransactionDetails";

type UpdatedData = {
    status: string;
    kycStatus: string;
    [key: string]: string;
};

const CustomerShow: React.FC = () => {
    const [activeSection, setActiveSection] = useState('Account');
    const {customer, setCustomer} = useCustomerStore()
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedStatus, setSelectedStatus] = useState<string >('');
    const [selectedKycStatus, setSelectedKycStatus] = useState<string >( '');

    const [previousStatus, setSPreviousStatus] = useState<string >('');
    const [previousKycStatus, setPreviousKycStatus] = useState<string >( '');

    const [toastInfo, setToastInfo] = useState<{
        type: string,
        description: string,
    }>({
        type: '',
        description: '',
    });


    const statuses: IListBoxItem[] = [
        {label: 'Created', value: 'created'},
        {label: 'Activated', value: 'activated'},
        {label: 'Deactivated', value: 'deactivated'},
    ]


    const kycStatuses: IListBoxItem[] = [
        {label: 'Queued', value: 'queued'},
        {label: 'Approved', value: 'approved'},
        {label: 'Declined', value: 'declined'},
        {label: 'Submitted', value: 'submitted'},
    ]

    const secondaryNavigation = [
        {name: 'Account', href: '#', current: true},
        {name: 'Documents', href: '#', current: false},
        {name: 'Transactions', href: '#', current: false},
        {name: 'Loans', href: '#', current: false},
    ]

    const customerId = useParams()?.customer.toString()

    const {authenticatedAdmin} = useAdminStore()


    useEffect(() => {
        fetchCustomer()
    }, [])


    const fetchCustomer = () => {
        showUser(authenticatedAdmin?.bearerToken, customerId)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {data} = feedback

                    console.log('data: ', data)

                    if (setCustomer) setCustomer(data);
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }


    const handleNavigationClick = (sectionName: string) => {
        setActiveSection(sectionName);

        if (sectionName === 'Transactions') {
            fetchTransactions(filterQueryString)
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCustomer({...customer, [name]: value});
    };


    const isLenderStatusUpdated = previousStatus !== selectedStatus

    const isLenderKycStatusUpdated = previousKycStatus !== selectedKycStatus

    const handleUpdateCustomer = () => {

        setLoading(true)

        const updatedData: UpdatedData = {status: '', kycStatus: ''}

        if (isLenderStatusUpdated) {
            updatedData.status = selectedStatus
        }

        if (isLenderKycStatusUpdated) {
            updatedData.kycStatus = selectedKycStatus
        }

        Object.keys(updatedData).forEach(key => updatedData[key] === '' && delete updatedData[key]);


        !isObjectEmpty(updatedData) && customer.externalId && updateUser(customer.externalId, updatedData)
            .then(async response => {

                setLoading(false)
                if (response.status == 204) {

                    if (setCustomer) setCustomer(customer)
                    return setToastInfo({type: 'success', description: 'Updated Successfully'})
                }

                return setToastInfo({type: 'error', description: 'Something went wrong'})

            }).catch((error) => {
                setToastInfo({type: 'error', description: 'Something went wrong'});
                console.log('error: ', error)
            })

        setLoading(false)
    }

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus);
        setSPreviousStatus(customer?.status ?? '')

        customer.status = newStatus
    }

    const handleKycStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newKycStatus = e.target.value;
        setSelectedKycStatus(newKycStatus);
        setPreviousKycStatus(customer?.kycStatus ?? '')

        customer.kycStatus = newKycStatus
    }

    const resolveDocumentName = (name: string) => {
        let resolvedName = name
        switch (name) {
            case 'ghana-card-back':
                resolvedName = 'Ghana Card Back'
                break
            case 'ghana-card-front':
                resolvedName = 'Ghana Card Front'
                break
            default:
                resolvedName = 'Selfie'
        }
        return resolvedName
    }


    const transactionsTableHeaders = [
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

    const {transactions, setTransactions, setTransaction, transaction} = useCustomerStore()

    const [filterQueryString, setFilterQueryString] = useState<string>('pageSize=10');




    const fetchTransactions = (params: string = '') => {
        // listUserTransactions(authenticatedAdmin?.bearerToken, params)
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


    const handleSetPageOption = (pageOption: IListBoxItem) => {
        const queryString = prepareFilterQueryString({pageSize: pageOption.value}, filterQueryString)
        setFilterQueryString(queryString);
        fetchTransactions(queryString)
        setPageOption(pageOption)
    }


    const [slideOverOpen, setSlideOverOpen] = useState<boolean>(false);


    const handleViewLoanDetails = (transaction: TransactionType) => {
        console.log(transaction)
        setTransaction(transaction)
        setSlideOverOpen(true)
    }

    const handleSlideOverOpen = () => {
        setSlideOverOpen(!slideOverOpen)
    }

    return (
        <>
            <div className="">
                <main>
                    <header className="border-b border-white/5">
                        {/* Secondary navigation */}
                        <nav className="flex overflow-x-auto py-4">
                            <ul
                                role="list"
                                className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                            >
                                {secondaryNavigation.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={item.name == activeSection ? 'text-indigo-400' : ''}
                                            onClick={() => handleNavigationClick(item.name)}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </header>

                    {/* Accounts */}
                    {activeSection == 'Account' && (
                        <div className="divide-y divide-white/5">

                            <div className="">

                                <form className="">

                                    <div className="flex lg:px-8 px-4 py-4">
                                        <div className="flex-1 mr-4">
                                            <TextInput
                                                label="Name"
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Name"
                                                value={customer.name}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <TextInput
                                                label="Phone Number"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="text"
                                                placeholder="Phone Number"
                                                value={customer.phoneNumber}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex lg:px-8 px-4">
                                        <div className="flex-1 mr-4">
                                            <TextInput
                                                label="Ghana Card Number"
                                                id="ghanaCardNumber"
                                                name="ghanaCardNumber"
                                                type="text"
                                                placeholder="Ghana Card Number"
                                                value={customer.ghanaCardNumber}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <TextInput
                                                label="Actual Balance"
                                                id="actualBalance"
                                                name="actualBalance"
                                                type="text"
                                                placeholder="Actual Balance"
                                                value={customer.actualBalance}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex lg:px-8 px-4">
                                        <div className="flex-1 mr-4">
                                            <TextInput
                                                label="Available Balance"
                                                id="availableBalance"
                                                name="availableBalance"
                                                type="text"
                                                placeholder="Actual Balance"
                                                value={customer.availableBalance}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <TextInput
                                                label="KYC Status"
                                                id="kycStatus"
                                                name="kycStatus"
                                                type="text"
                                                placeholder="KYC Status"
                                                value={customer.kycStatus}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                                customInputClasses="capitalize"
                                            />
                                        </div>


                                    </div>


                                    <div className="flex lg:px-8 px-4">

                                        <div className="flex-1 mr-4">

                                            {customer &&
                                                <CustomSelectInput options={statuses} onChange={handleStatusChange}
                                                                   value={customer.status ?? ''} label="Status"/>}

                                        </div>

                                        <div className="flex-1">
                                            {/*{customer && <CustomSelectInput options={kycStatuses}*/}
                                            {/*                              onChange={handleKycStatusChange}*/}
                                            {/*                              value={customer.kycStatus ?? ''}*/}
                                            {/*                              label="Kyc Status"/>}*/}
                                        </div>
                                    </div>

                                    <div
                                        className={`sm:mt-4 flex lg:px-8`}>
                                        <Button buttonType="button" styleType="primary"
                                                disabled={!isLenderKycStatusUpdated && !isLenderStatusUpdated}
                                                customStyles="p-4 md:p-5 rounded-lg"
                                                onClick={handleUpdateCustomer}>
                                            {'Save'}
                                            {loading && <Loader type="default"
                                                                customClasses="relative"
                                                                customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-purple-900"
                                            />}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Documents */}
                    {activeSection == 'Documents' && (
                        <div className="divide-y divide-white/5">

                            <div className="lg:px-8">

                                <div className="bg-white">
                                    <div className="">
                                        <ul
                                            role="list"
                                            className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                                        >
                                            {customer.files && customer.files.length > 0 ? customer.files.map((document) => (
                                                <li key={document.name}>
                                                    <img className="aspect-[3/2] w-full rounded-2xl object-cover"
                                                         src={document.url}
                                                         alt=""/>
                                                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{resolveDocumentName(document.name)}</h3>
                                                    <p className="text-base leading-7 text-gray-600"> Uploaded
                                                        Date: {document.createdAt}</p>
                                                </li>
                                            )) : (<p>No documents uploaded yet</p>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Transactions */}
                    {activeSection == 'Transactions' && (
                        <div className="divide-y divide-white/5">

                            <div className="lg:px-8">

                                {transactions.data && transactions.data.length ?    (
                                    <div><Table onButtonClick={() => {
                                }}>
                                    {{
                                        headers: transactionsTableHeaders,
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

                                                            <Link
                                                                onClick={() => handleViewLoanDetails(transaction)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                                href="">
                                                                Details <span className="sr-only">, {transaction.externalId}</span>
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
                                        ) : EmptyState()}
                            </div>
                        </div>
                    )}
                </main>
            </div>
            {toastInfo.type && <Toast toastType={toastInfo.type} toastDescription={toastInfo.description}/>}

        </>
    )
}

export default CustomerShow