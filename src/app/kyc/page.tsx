"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import KycList from "@/components/kyc/KycList";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const CustomersPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <KycList/>
        </DashboardLayout>
    )
}

export default CustomersPage