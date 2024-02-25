import {create} from 'zustand'
import {UserType} from "@/utils/types/UserType";
import {CustomerStoreType} from "@/utils/types/CustomerStoreType";
import {devtools, persist} from 'zustand/middleware';
import {getEmptyPaginationData} from "@/utils/helpers";
import {TransactionType} from "@/utils/types/TransactionType";

export const useCustomerStore = create<CustomerStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setCustomers: (data) => set({customers: data}),
                customers: get()?.customers,

                setCustomer: (customer) => set({customer}),
                customer: {},

                setLoading: (loading: boolean) => set({loading}),
                loading: false,

                resetCustomerStore: () => set({
                    customers: {
                        pagination: getEmptyPaginationData(),
                        data: []
                    },
                    customer: {},
                    loading: false
                }),
                setTransaction: (transaction?: TransactionType) => set({transaction}),
                getTransaction: (reference?: string) => get()?.transactions?.data.filter(transaction =>
                    transaction.externalId === reference || transaction.internalId === reference),
                transaction: {},
                setTransactions: (data) => set({transactions: data}),
                transactions: {
                    pagination: getEmptyPaginationData(),
                    data: []
                },
            }),
            {
                name: 'customer'
            }
            ,
        ),
    ),
)