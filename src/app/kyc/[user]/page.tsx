"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import KycShow from "@/components/kyc/KycShow";

const CustomersPage: React.FC = () => {
    return (
        <DashboardLayout>
           <KycShow></KycShow>
        </DashboardLayout>
    )
}

export default CustomersPage