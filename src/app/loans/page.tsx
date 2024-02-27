"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoanContent from "@/components/loans/LoanContent";

const LoansPage: React.FC = () => {
    return (
        <DashboardLayout>
            <LoanContent filter={true}/>
        </DashboardLayout>
    )
}

export default LoansPage