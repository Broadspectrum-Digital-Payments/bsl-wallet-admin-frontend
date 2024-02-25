import {TransactionType} from "@/utils/types/TransactionType";
import {MonthlyTransactionSummaryType} from "@/utils/types/MonthlyTransactionSummaryType";
import {PaginationType} from "@/utils/types/PaginationType";

export type TransactionStoreType = {
    setTransaction: (transaction: TransactionType) => void,
    getTransaction: (reference?: string) => TransactionType[],
    transaction: TransactionType,
    setTransactions: (data: { pagination: PaginationType, data: TransactionType[] }) => void
    transactions: { pagination: PaginationType, data: TransactionType[] },

    setTransactionSummary?: (summary: MonthlyTransactionSummaryType) => void,
    transactionSummary?: MonthlyTransactionSummaryType,
    setLoading?: (loading: boolean) => void,
    loading?: boolean,

    resetTransactionStore?: () => void,
}