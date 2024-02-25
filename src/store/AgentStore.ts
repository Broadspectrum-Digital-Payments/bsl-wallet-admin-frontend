import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {getEmptyPaginationData} from "@/utils/helpers";
import {AgentStoreType} from "@/utils/types/AgentStoreType";
import {TransactionType} from "@/utils/types/TransactionType";

export const useAgentStore = create<AgentStoreType>()(
    devtools(
        persist(
            (set, get) => ({
                setAgents: (data) => set({agents: data}),
                agents: get()?.agents,

                setAgent: (agent) => set({agent}),
                agent: {},

                setLoading: (loading) => set({loading}),
                loading: false,

                resetAgentStore: () => set({
                    agents: {
                        pagination: getEmptyPaginationData(),
                        data: []
                    },
                    agent: {},
                    loading: false
                }),
                setTransaction: (transaction?: TransactionType) => set({transaction}),
                getTransaction: (reference?: string) => get()?.transactions?.data.filter(transaction =>
                    transaction.externalId === reference || transaction.internalId === reference),
                transaction: {},
                setTransactions: (data) => set({transactions: data}),
                transactions: {
                    pagination: getEmptyPaginationData(),
                    data: []
                },
            }),
            {name: 'agent'},
        ),
    ),
)