"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import AgentList from "@/components/agents/AgentList";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const CustomersPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <AgentList/>
        </DashboardLayout>
    )
}

export default CustomersPage