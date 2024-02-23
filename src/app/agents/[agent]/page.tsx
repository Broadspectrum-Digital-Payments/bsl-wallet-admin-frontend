"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import AgentShow from "@/components/agents/AgentShow";

const CustomersPage: React.FC = () => {
    return (
        <DashboardLayout>
           <AgentShow/>
        </DashboardLayout>
    )
}

export default CustomersPage