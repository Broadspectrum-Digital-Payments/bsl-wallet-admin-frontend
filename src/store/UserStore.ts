import {create} from 'zustand'
import {UserType} from "@/utils/types/UserType";
import {UserStoreType} from "@/utils/types/UserStoreType";
import {devtools, persist} from 'zustand/middleware';

export const useUserStore = create<UserStoreType>()(
    devtools(
        persist(
            (set) => ({
                setUser: (user?: UserType) => set({user}),
                user: {
                    fullName: 'Jonadab Kwamlah',
                    role: 'Super user',
                },
                isAuthenticated: false,
                setIsAuthenticated: (isAuthenticated) => set({isAuthenticated}),
            }),
            {name: 'user'},
        ),
    ),
)
