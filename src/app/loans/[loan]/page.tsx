"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoanShow from "@/components/loans/LoanShow";

const CustomersPage: React.FC = () => {
    return (
        <DashboardLayout>
           <LoanShow/>
        </DashboardLayout>
    )
}

export default CustomersPage