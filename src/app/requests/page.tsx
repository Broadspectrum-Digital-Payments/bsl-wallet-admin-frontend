"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";
import RequestsContent from "@/components/requests/RequestsContent";

const LoansPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <RequestsContent/>
        </DashboardLayout>
    )
}

export default LoansPage