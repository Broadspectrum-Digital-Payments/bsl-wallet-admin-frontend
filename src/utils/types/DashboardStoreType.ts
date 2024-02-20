import {MenuItemType} from "@/utils/types/MenuItemType";
import {PageInfoType} from "@/utils/types/PageInfoType";

export type DashboardStoreType = {
    setMainMenuItemsList: (navigationItems: MenuItemType[]) => void,
    mainMenuItemsList: MenuItemType[],

    setActiveSidebarMenu: (activeMenu: MenuItemType) => void,
    activeSidebarMenu: MenuItemType

    setProfileDropdownItems: (profileDropdownItems: MenuItemType[]) => void,
    profileDropdownItems: MenuItemType[],

    setBottomMenuItemsList: (bottomMenuItemsList: MenuItemType[]) => void,
    bottomMenuItemsList: MenuItemType[],

    setPageInfo: (pageInfo: PageInfoType) => void,
    pageInfo: PageInfoType,
}