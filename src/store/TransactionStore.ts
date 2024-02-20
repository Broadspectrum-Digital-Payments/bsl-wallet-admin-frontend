import {create} from 'zustand'
import {TransactionType} from '@/utils/types/TransactionType'
import {TransactionStoreType} from "@/utils/types/TransactionStoreType";
import {devtools, persist} from 'zustand/middleware';

export const useTransactionStore = create<TransactionStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setTransaction: (transaction?: TransactionType) => set({transaction}),
                getTransaction: (reference?: string) => get()?.transactions?.data.filter(transaction =>
                    transaction.externalId === reference || transaction.internalId === reference),
                transaction: {},
                setTransactions: (data) => set({transactions: data}),
                transactions: {
                    pagination: {
                        size: 0,
                        pageNumber: 0,
                        offset: 0,
                        lastPage: false,
                        firstPage: true,
                        sorting: {
                            empty: true,
                            unsorted: false,
                            sorted: true,
                        },
                        totalPages: 0,
                        totalElements: 0
                    },
                    data: []
                },

                setCollections: (data) => set({collections: data}),
                collections: get()?.collections,

                setDisbursements: (data) => set({disbursements: data}),
                disbursements: get()?.disbursements,

                setScheduledPayments: (data) => set({scheduledPayments: data}),
                scheduledPayments: get()?.scheduledPayments,

                setTransactionSummary: (summary) => set({transactionSummary: summary ?? []}),
                transactionSummary: {},

                setLoading: (loading) => set({loading}),
                loading: false,

                resetTransactionStore: () => set({
                    transaction: {},
                    transactions: {
                        pagination: {
                            pageNumber: 0,
                            offset: 0,
                            size: 0,
                            lastPage: false,
                            firstPage: false,
                            sorting: {
                                empty: false,
                                unsorted: false,
                                sorted: false
                            },
                            totalPages: 0,
                            totalElements: 0,
                        },
                        data: []
                    },
                    collections: {
                        pagination: {
                            pageNumber: 0,
                            offset: 0,
                            size: 0,
                            lastPage: false,
                            firstPage: false,
                            sorting: {
                                empty: false,
                                unsorted: false,
                                sorted: false
                            },
                            totalPages: 0,
                            totalElements: 0,
                        },
                        transactions: []
                    },
                    disbursements: {
                        pagination: {
                            pageNumber: 0,
                            offset: 0,
                            size: 0,
                            lastPage: false,
                            firstPage: false,
                            sorting: {
                                empty: false,
                                unsorted: false,
                                sorted: false
                            },
                            totalPages: 0,
                            totalElements: 0,
                        },
                        transactions: []
                    },
                    scheduledPayments: {
                        pagination: {
                            pageNumber: 0,
                            offset: 0,
                            size: 0,
                            lastPage: false,
                            firstPage: false,
                            sorting: {
                                empty: false,
                                unsorted: false,
                                sorted: false
                            },
                            totalPages: 0,
                            totalElements: 0,
                        },
                        transactions: []
                    },
                    transactionSummary: {},
                    loading: false
                }),
            }),
            {name: 'transaction'},
        ),
    ),
)
