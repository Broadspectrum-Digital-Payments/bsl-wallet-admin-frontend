"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoanList from "@/components/loans/LoanList";

const LoansPage: React.FC = () => {
    return (
        <DashboardLayout>
            <LoanList/>
        </DashboardLayout>
    )
}

export default LoansPage