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
                    externalId: 'JonadabKwamlah',
                    name: 'Jonadab Kwamlah',
                    email: 'jonadab@gmail.com',
                    status: 'active',
                    createdAt: '2024-02-21 20:32',
                },
                setIsAuthenticated: (isAuthenticated) => set({isAuthenticated}),
                isAuthenticated: false,
                setFirstTimeLogin: (firstTimeLogin) => set({firstTimeLogin}),
                firstTimeLogin: true,
                resetUserStore: () => set({
                    user: {},
                    isAuthenticated: false,
                    firstTimeLogin: false
                }),
            }),
            {name: 'user'},
        ),
    ),
)
