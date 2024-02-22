import {create} from 'zustand'
import {UserType} from "@/utils/types/UserType";
import {UserStoreType} from "@/utils/types/UserStoreType";
import {devtools, persist} from 'zustand/middleware';
import {getEmptyPaginationData} from "@/utils/helpers";

export const useUserStore = create<UserStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setUsers: (data) => set({users: data}),
                users: get()?.users,

                setUser: (user?: UserType) => set({user}),
                user: {},

                setLoading: (loading) => set({loading}),
                loading: false,

                resetUserStore: () => set({
                    users: {
                        pagination: getEmptyPaginationData(),
                        data: []
                    },
                    user: {},
                    loading: false
                }),
            }),
            {
                name: 'user'
            }
            ,
        ),
    ),
)
