import {PaginationType} from "@/utils/types/PaginationType";
import {UserType} from "@/utils/types/UserType";
import {AdminType} from "@/utils/types/AdminType";

export type AdminStoreType = {
    setAdmins: (data: { pagination: PaginationType, data: AdminType[] }) => void
    admins: { pagination: PaginationType, data: AdminType[] }

    setAuthenticatedAdmin: (authenticatedAdmin: AdminType) => void
    authenticatedAdmin: AdminType
    setIsAuthenticated?: (isAuthenticated: boolean) => void
    isAuthenticated?: boolean

    setFirstTimeLogin?: (firstTimeLogin: boolean) => void
    firstTimeLogin?: boolean

    setLoading?: (loading: boolean) => void
    loading?: boolean

    resetAdminStore?: () => void
}