"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionList from "@/app/transactions/TransactionList";

const TransactionsPage: React.FC = () => {
    return (
        <DashboardLayout>
           <TransactionList></TransactionList>
        </DashboardLayout>
    )
}

export default TransactionsPage