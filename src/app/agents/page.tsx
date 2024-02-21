"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import AgentList from "@/app/agents/AgentList";

const CustomersPage: React.FC = () => {
    return (
        <DashboardLayout>
            <AgentList></AgentList>
        </DashboardLayout>
    )
}

export default CustomersPage