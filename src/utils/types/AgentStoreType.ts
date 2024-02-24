import {PaginationType} from "@/utils/types/PaginationType";
import {UserType} from "@/utils/types/UserType";

export type AgentStoreType = {
    setAgents: (data: { pagination: PaginationType, data: UserType[] }) => void
    agents: { pagination: PaginationType, data: UserType[] },

    setAgent: (agent: UserType) => void
    agent: UserType,

    setLoading?: (loading: boolean) => void
    loading?: boolean

    resetAgentStore?: () => void,
}