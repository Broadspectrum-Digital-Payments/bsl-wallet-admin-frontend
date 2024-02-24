"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionShow from "@/components/transactions/TransactionShow";

const TransactionShowPage: React.FC = () => {
    return (
        <DashboardLayout>
           <TransactionShow></TransactionShow>
        </DashboardLayout>
    )
}

export default TransactionShowPage