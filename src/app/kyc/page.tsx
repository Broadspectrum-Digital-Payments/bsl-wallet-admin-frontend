"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";;
import KycList from "@/components/kyc/KycList";

const CustomersPage: React.FC = () => {
    return (
        <DashboardLayout>
           <KycList></KycList>
        </DashboardLayout>
    )
}

export default CustomersPage