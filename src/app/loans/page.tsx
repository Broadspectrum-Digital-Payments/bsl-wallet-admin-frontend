"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoanList from "@/components/loans/LoanList";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const LoansPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <LoanList/>
        </DashboardLayout>
    )
}

export default LoansPage