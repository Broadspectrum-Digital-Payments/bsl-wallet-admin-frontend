"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import RequestsContent from "@/components/requests/RequestsContent";

const LoansPage: React.FC = () => {
    return (
        <DashboardLayout>
            <RequestsContent/>
        </DashboardLayout>
    )
}

export default LoansPage