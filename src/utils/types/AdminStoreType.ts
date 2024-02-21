import {PaginationType} from "@/utils/types/PaginationType";
import {UserType} from "@/utils/types/UserType";

export type AdminStoreType = {
    setAdmins: (data: { pagination: PaginationType, data: UserType[] }) => void
    admins: { pagination: PaginationType, data: UserType[] },
    admin: UserType,
    setLoading?: (loading: boolean) => void,
    loading?: boolean,
    resetAdminStore?: () => void,
}