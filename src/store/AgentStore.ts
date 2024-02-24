import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {getEmptyPaginationData} from "@/utils/helpers";
import {AgentStoreType} from "@/utils/types/AgentStoreType";

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
            }),
            {name: 'agent'},
        ),
    ),
)