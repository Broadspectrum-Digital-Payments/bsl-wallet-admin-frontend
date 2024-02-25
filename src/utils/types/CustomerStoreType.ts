import {PaginationType} from "@/utils/types/PaginationType";
import {UserType} from "@/utils/types/UserType";
import {TransactionType} from "@/utils/types/TransactionType";

export type CustomerStoreType = {
    setCustomers: (data: { pagination: PaginationType, data: UserType[] }) => void
    customers: { pagination: PaginationType, data: UserType[] },

    setCustomer: (customer: UserType) => void
    customer: UserType,

    setLoading?: (loading: boolean) => void
    loading?: boolean

    resetCustomerStore?: () => void,

    setTransaction: (transaction: TransactionType) => void,
    getTransaction: (reference?: string) => TransactionType[],
    transaction: TransactionType,
    setTransactions: (data: { pagination: PaginationType, data: TransactionType[] }) => void
    transactions: { pagination: PaginationType, data: TransactionType[] },
}