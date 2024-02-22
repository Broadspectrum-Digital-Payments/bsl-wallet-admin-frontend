import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {UserType} from "@/utils/types/UserType";
import {AdminStoreType} from "@/utils/types/AdminStoreType";
import {getEmptyPaginationData} from "@/utils/helpers";

export const useAdminStore = create<AdminStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setAdmin: (admin?: UserType) => set({admin}),
                admin: {},
                setAdmins: (data) => set({admins: data}),
                admins: get()?.admins,

                setLoading: (loading) => set({loading}),
                loading: false,

                resetAdminStore: () => set({
                    admin: {},
                    admins: {
                        pagination: {
                            from: 0,
                            to: 0,
                            pageSize: 0,
                            lastPage: false,
                            firstPage: false,
                            previousPage: null,
                            nextPage: null,
                            currentPage: null,
                            totalElements: 0
                        },
                        data: []
                    },
                    loading: false
                }),
            }),
            {name: 'admin'},
        ),
    ),
)
