import {PaginationType} from "@/utils/types/PaginationType";
import {LenderType} from "@/utils/types/LenderType";

export type LenderStoreType = {
    setLenders: (data: { pagination: PaginationType, data: LenderType[] }) => void
    lenders: { pagination: PaginationType, data: LenderType[] },

    setLender: (user: LenderType) => void
    lender: LenderType,

    setLoading?: (loading: boolean) => void
    loading?: boolean

    setAuthenticatedLender: (authenticatedLender: LenderType) => void
    authenticatedLender: LenderType
    setIsAuthenticated?: (isAuthenticated: boolean) => void
    isAuthenticated?: boolean

    setFirstTimeLogin?: (firstTimeLogin: boolean) => void
    firstTimeLogin?: boolean

    resetLenderStore?: () => void,
}