"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LenderList from "@/components/lenders/LenderList";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const LendersPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();

    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <LenderList/>
        </DashboardLayout>
    )
}

export default LendersPage;