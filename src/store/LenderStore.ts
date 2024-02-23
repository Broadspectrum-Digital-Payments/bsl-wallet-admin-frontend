import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {AdminStoreType} from "@/utils/types/AdminStoreType";
import {getEmptyPaginationData} from "@/utils/helpers";
import {AdminType} from "@/utils/types/AdminType";
import {LenderStoreType} from "@/utils/types/LenderStoreType";
import {LenderType} from "@/utils/types/LenderType";

export const useLenderStore = create<LenderStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setLenders: (data) => set({lenders: data}),
                lenders: get()?.lenders,

                setLender: (data) => set({lender: data}),
                lender: get()?.lender,
                setAuthenticatedLender: (authenticatedLender?: LenderType) => set({authenticatedLender}),
                authenticatedLender: {},

                setIsAuthenticated: (isAuthenticated?: boolean) => set({isAuthenticated}),
                isAuthenticated: false,

                setFirstTimeLogin: (firstTimeLogin?: boolean) => set({firstTimeLogin}),
                firstTimeLogin: false,

                setLoading: (loading) => set({loading}),
                loading: false,

                resetLenderStore: () => set({
                    authenticatedLender: {},
                    lenders: {
                        pagination: getEmptyPaginationData(),
                        data: []
                    },
                    isAuthenticated: false,
                    firstTimeLogin: false,
                    loading: false
                }),
            }),
            {name: 'lender'},
        ),
    ),
)