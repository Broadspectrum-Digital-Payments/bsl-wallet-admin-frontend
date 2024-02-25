import React, {useState} from 'react'
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import Loader from "@/components/Loader";
import KycApprovalDecision from "@/components/kyc/KycApprovalDecision";
import {useAgentStore} from "@/store/AgentStore";
import {
    extractPaginationData,
    formatAmount,
    getError,
    prepareFilterQueryString,
    stringToTitleCase
} from "@/utils/helpers";
import {updateUser} from "@/api/user";
import {UserType} from "@/utils/types/UserType";
import Toast from "@/components/Toast";
import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Badge from "@/components/Badge";
import Link from "next/link";
import Pagination from "@/components/table/Pagination";
import SlideOverWrapper from "@/components/SlideOver";
import TransactionDetails from "@/components/transactions/TransactionDetails";
import EmptyState from "@/components/EmptyState";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import {useCustomerStore} from "@/store/CustomerStore";
import {listTransactions} from "@/api/transaction";
import {TransactionType} from "@/utils/types/TransactionType";
import {useAdminStore} from "@/store/AdminStore";

const AgentShow: React.FC = () => {
    const [activeSection, setActiveSection] = useState('Account');
    const [formData, setFormData] = useState<UserType>({
        externalId: '',
        name: '',
        ghanaCardNumber: '',
        phoneNumber: '',
        type: '',
        status: '',
        kycStatus: '',
        actualBalance: '',
        availableBalance: '',
        createdAt: ''
    });
    const [toastInfo, setToastInfo] = useState<{ type: string, description: string }>({
        type: '',
        description: '',
    });
    const {agents, agent, setAgents, setAgent} = useAgentStore()
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const secondaryNavigation = [
        {name: 'Account', href: '#', current: true},
        {name: 'Documents', href: '#', current: false},
        {name: 'Transactions', href: '#', current: false},
        {name: 'Loans', href: '#', current: false},
    ]

    const handleNavigationClick = (sectionName: string) => {
        setActiveSection(sectionName);
        if (sectionName === 'Transactions') {
            fetchTransactions(filterQueryString)
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleUpdateAgent = (event: React.FormEvent) => {
        event.preventDefault()

        updateUser(agent.externalId, {...formData})
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const updatedAgentIndex = agents.data.findIndex(agent => agent.externalId === formData.externalId)
                    if (updatedAgentIndex !== -1) {
                        const updatedAgentsData = [...agents.data];
                        updatedAgentsData[updatedAgentIndex] = {...updatedAgentsData[updatedAgentIndex], ...formData}

                        if (setAgents) setAgents({pagination: agents.pagination, data: updatedAgentsData});
                        if (setAgent) setAgent({...updatedAgentsData[updatedAgentIndex]});

                        return setToastInfo({type: 'success', description: feedback.message})
                    }

                    return setToastInfo({type: 'error', description: feedback.message})
                }
            }).catch((error) => {
            setToastInfo({type: 'error', description: getError(error)})
        })
    }

    const documents = [
        {
            name: 'ghana-card-back',
            url:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            createdAt: "2024-02-20 22:09:20",
        },
        {
            name: 'ghana-card-front',
            url:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            createdAt: "2024-02-20 22:09:20",
        },
        {
            name: 'selfie',
            url:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            createdAt: "2024-02-20 22:09:20",
        },
    ]

    const handleApproveKyc = () => {
    }

    const handleRejectKyc = () => {
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

    const {transactions, setTransactions, setTransaction, transaction} = useAgentStore()

    const [filterQueryString, setFilterQueryString] = useState<string>('pageSize=10');

    const {authenticatedAdmin} = useAdminStore()


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


    const handleViewTransactionDetails = (transaction: TransactionType) => {
        setTransaction(transaction)
        setSlideOverOpen(true)
    }

    const handleSlideOverOpen = () => {
        setSlideOverOpen(!slideOverOpen)
    }
    return (
        <div className="">
            <main>
                <header className="border-b border-white/5">
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

                            <form onSubmit={handleUpdateAgent}>
                                <div className="flex lg:px-8 px-4 py-4">
                                    <div className="flex-1 mr-4">
                                        <TextInput
                                            label="Name"
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Name"
                                            value={agent.name}
                                            required={true}
                                            onInputChange={handleInputChange}
                                            hasError={setHasError}
                                            autoComplete="false"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <TextInput
                                            label="Phone Number"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="text"
                                            placeholder="Phone Number"
                                            value={agent.phoneNumber}
                                            required={true}
                                            onInputChange={handleInputChange}
                                            hasError={setHasError}
                                            autoComplete="false"
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
                                            value={agent.ghanaCardNumber}
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
                                            value={formatAmount(agent.actualBalance, '')}
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
                                            value={formatAmount(agent.actualBalance, '')}
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
                                            value={agent.kycStatus}
                                            required={true}
                                            onInputChange={handleInputChange}
                                            hasError={setHasError}
                                            autoComplete="false"
                                            disabled={true}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`sm:mt-4 flex lg:px-8`}>
                                    <Button buttonType="submit" styleType="primary"
                                            customStyles="p-4 md:p-5 rounded-lg">
                                        {'Save'}
                                        {loading && <Loader type="default"
                                                            customClasses="relative"
                                                            customAnimationClasses="w-10 h-5 text-white dark:text-gray-600 fill-purple-900"
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
                                        {documents.map((document) => (
                                            <li key={document.name}>
                                                <img className="aspect-[3/2] w-full rounded-2xl object-cover"
                                                     src={document.url}
                                                     alt=""/>
                                                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{stringToTitleCase(document.name)}</h3>
                                                <p className="text-base leading-7 text-gray-600"> Uploaded
                                                    Date: {document.createdAt}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <KycApprovalDecision onApprove={handleApproveKyc} onReject={handleRejectKyc}/>
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
                                                                onClick={() => handleViewTransactionDetails(transaction)}
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

            {toastInfo.type && <Toast toastType={toastInfo.type} toastDescription={toastInfo.description}/>}
        </div>
    )
}

export default AgentShow