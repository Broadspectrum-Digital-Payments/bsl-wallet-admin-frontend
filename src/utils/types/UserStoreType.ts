import {UserType} from "@/utils/types/UserType";
import {PaginationType} from "@/utils/types/PaginationType";

export type UserStoreType = {
    setUsers: (data: { pagination: PaginationType, data: UserType[] }) => void
    users: { pagination: PaginationType, data: UserType[] },

    setUser: (user: UserType) => void
    user: UserType,

    setLoading?: (loading: boolean) => void
    loading?: boolean

    resetUserStore?: () => void,
}