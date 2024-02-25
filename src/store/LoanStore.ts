import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {getEmptyPaginationData} from "@/utils/helpers";
import {LoanStoreType} from "@/utils/types/LoanStoreType";
import {LoanType} from "@/utils/types/LoanType";

export const useLoanStore = create<LoanStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setLoan: (loan?: LoanType) => set({loan}),
                loan: {},

                setLoans: (data) => set({loans: data}),
                loans: {
                    pagination: getEmptyPaginationData(),
                    data: []
                },

                setLoading: (loading) => set({loading}),
                loading: false,

                resetLoanStore: () => set({
                    loan: {},
                    loans: {
                        pagination: getEmptyPaginationData(),
                        data: []
                    },
                    loading: false
                }),
            }),
            {name: 'loan'},
        ),
    ),
)
