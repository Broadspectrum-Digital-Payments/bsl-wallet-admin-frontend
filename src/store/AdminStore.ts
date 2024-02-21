import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {UserType} from "@/utils/types/UserType";
import {AdminStoreType} from "@/utils/types/AdminStoreType";

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
                    loading: false
                }),
            }),
            {name: 'admin'},
        ),
    ),
)
