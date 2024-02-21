import {UserType} from "@/utils/types/UserType";

export type UserStoreType = {
    setUser?: (user?: UserType) => void,
    user?: UserType,
    setIsAuthenticated?: (isAuthenticated: boolean) => void,
    isAuthenticated?: boolean,
    setFirstTimeLogin?: (firstTimeLogin: boolean) => void,
    firstTimeLogin?: boolean,
    resetUserStore?: () => void,
}