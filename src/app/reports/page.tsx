"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const ReportsPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <div>
                Reports works!
            </div>
        </DashboardLayout>
    )
}

export default ReportsPage