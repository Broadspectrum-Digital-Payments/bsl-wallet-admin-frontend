"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionList from "@/components/transactions/TransactionList";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const TransactionsPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <TransactionList/>
        </DashboardLayout>
    )
}

export default TransactionsPage