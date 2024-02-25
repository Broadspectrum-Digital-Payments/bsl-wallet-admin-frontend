import {create} from 'zustand'
import {TransactionType} from '@/utils/types/TransactionType'
import {TransactionStoreType} from "@/utils/types/TransactionStoreType";
import {devtools, persist} from 'zustand/middleware';
import {getEmptyPaginationData} from "@/utils/helpers";

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
                    pagination: getEmptyPaginationData(),
                    data: []
                },

                setTransactionSummary: (summary) => set({transactionSummary: summary ?? []}),
                transactionSummary: {},

                setLoading: (loading) => set({loading}),
                loading: false,

                resetTransactionStore: () => set({
                    transaction: {},
                    transactions: {
                        pagination: getEmptyPaginationData(),
                        data: []
                    },
                    transactionSummary: {},
                    loading: false
                }),
            }),
            {name: 'transaction'},
        ),
    ),
)
