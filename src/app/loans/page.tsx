"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoansContent from "@/components/loans/LoansContent";

const LoansPage: React.FC = () => {

    return (
        <DashboardLayout>
            <LoansContent/>
        </DashboardLayout>
    )
}

export default LoansPage