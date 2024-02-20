import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {DashboardStoreType} from '@/utils/types/DashboardStoreType';
import {PageInfoType} from "@/utils/types/PageInfoType";
import {MenuItemType} from "@/utils/types/MenuItemType";

const useDashboardStore = create<DashboardStoreType>()(
    devtools(
        persist(
            (set) => ({
                setMainMenuItemsList: (mainMenuItemsList) => set({mainMenuItemsList}),
                mainMenuItemsList: [],

                setActiveSidebarMenu: (activeSidebarMenu: MenuItemType) => set({activeSidebarMenu}),
                activeSidebarMenu: {
                    name: '',
                    href: '',
                    label: '',
                    icon: true,
                    category: ''
                },

                setProfileDropdownItems: (profileDropdownItems) => set({profileDropdownItems}),
                profileDropdownItems: [],

                setBottomMenuItemsList: (bottomMenuItemsList) => set({bottomMenuItemsList}),
                bottomMenuItemsList: [],

                setPageInfo: (pageInfo?: PageInfoType) => set({pageInfo}),
                pageInfo: {
                    title: '',
                    description: '',
                },
            }),
            {name: 'dashboard-layout'},
        ),
    ),
)

export {useDashboardStore};
