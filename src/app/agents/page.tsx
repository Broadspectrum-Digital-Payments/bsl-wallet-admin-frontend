"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import AgentList from "@/components/agents/AgentList";

const CustomersPage: React.FC = () => {
    return (
        <DashboardLayout>
            <AgentList/>
        </DashboardLayout>
    )
}

export default CustomersPage