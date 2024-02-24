import {create} from 'zustand'
import {UserType} from "@/utils/types/UserType";
import {CustomerStoreType} from "@/utils/types/CustomerStoreType";
import {devtools, persist} from 'zustand/middleware';
import {getEmptyPaginationData} from "@/utils/helpers";

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
            }),
            {
                name: 'customer'
            }
            ,
        ),
    ),
)