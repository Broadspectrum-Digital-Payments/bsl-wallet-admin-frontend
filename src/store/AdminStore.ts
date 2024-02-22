import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {AdminStoreType} from "@/utils/types/AdminStoreType";
import {getEmptyPaginationData} from "@/utils/helpers";
import {AdminType} from "@/utils/types/AdminType";

export const useAdminStore = create<AdminStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setAdmins: (data) => set({admins: data}),
                admins: get()?.admins,

                setAuthenticatedAdmin: (authenticatedAdmin?: AdminType) => set({authenticatedAdmin}),
                authenticatedAdmin: {},

                setIsAuthenticated: (isAuthenticated?: boolean) => set({isAuthenticated}),
                isAuthenticated: false,

                setFirstTimeLogin: (firstTimeLogin?: boolean) => set({firstTimeLogin}),
                firstTimeLogin: false,

                setLoading: (loading) => set({loading}),
                loading: false,

                resetAdminStore: () => set({
                    authenticatedAdmin: {},
                    admins: {
                        pagination: getEmptyPaginationData(),
                        data: []
                    },
                    isAuthenticated: false,
                    firstTimeLogin: false,
                    loading: false
                }),
            }),
            {name: 'admin'},
        ),
    ),
)
