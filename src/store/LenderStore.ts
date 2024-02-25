import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {getEmptyPaginationData} from "@/utils/helpers";
import {LenderStoreType} from "@/utils/types/LenderStoreType";
import {LenderType} from "@/utils/types/LenderType";

export const useLenderStore = create<LenderStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setLenders: (data) => set({lenders: data}),
                lenders: get()?.lenders,

                setLender: (data) => set({lender: data}),
                lender: {},

                setAuthenticatedLender: (authenticatedLender?: LenderType) => set({authenticatedLender}),
                authenticatedLender: {},

                setIsLenderAuthenticated: (isLenderAuthenticated?: boolean) => set({isLenderAuthenticated}),
                isLenderAuthenticated: false,

                setLoading: (loading) => set({loading}),
                loading: false,

                resetLenderStore: () => set({
                    authenticatedLender: {},
                    lenders: {
                        pagination: getEmptyPaginationData(),
                        data: []
                    },
                    isLenderAuthenticated: false,
                    loading: false
                }),
            }),
            {name: 'lender'},
        ),
    ),
)