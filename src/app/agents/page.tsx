"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import AgentList from "@/components/agents/AgentList";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";
import LenderList from "@/components/lenders/LenderList";
import EmptyState from "@/components/EmptyState";
import {useAgentStore} from "@/store/AgentStore";

const CustomersPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    const {agents} = useAgentStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            {agents && agents.data.length > 0 && <AgentList/>}
            {agents && !agents.data.length && <EmptyState/>}
        </DashboardLayout>
    )
}

export default CustomersPage