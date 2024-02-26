"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoanContent from "@/components/loans/LoanContent";
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
            <LoanContent filter={true}/>
        </DashboardLayout>
    )
}

export default LoansPage