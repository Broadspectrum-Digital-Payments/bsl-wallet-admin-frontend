"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionList from "@/components/transactions/TransactionList";

const TransactionsPage: React.FC = () => {
    return (
        <DashboardLayout>
           <TransactionList/>
        </DashboardLayout>
    )
}

export default TransactionsPage