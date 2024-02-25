import {PaginationType} from "@/utils/types/PaginationType";
import {UserType} from "@/utils/types/UserType";
import {TransactionType} from "@/utils/types/TransactionType";

export type AgentStoreType = {
    setAgents: (data: { pagination: PaginationType, data: UserType[] }) => void
    agents: { pagination: PaginationType, data: UserType[] },

    setAgent: (agent: UserType) => void
    agent: UserType,

    setLoading?: (loading: boolean) => void
    loading?: boolean

    resetAgentStore?: () => void,

    setTransaction: (transaction: TransactionType) => void,
    getTransaction: (reference?: string) => TransactionType[],
    transaction: TransactionType,
    setTransactions: (data: { pagination: PaginationType, data: TransactionType[] }) => void
    transactions: { pagination: PaginationType, data: TransactionType[] },
}