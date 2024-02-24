import {PaginationType} from "@/utils/types/PaginationType";
import {UserType} from "@/utils/types/UserType";

export type CustomerStoreType = {
    setCustomers: (data: { pagination: PaginationType, data: UserType[] }) => void
    customers: { pagination: PaginationType, data: UserType[] },

    setCustomer: (customer: UserType) => void
    customer: UserType,

    setLoading?: (loading: boolean) => void
    loading?: boolean

    resetCustomerStore?: () => void,
}