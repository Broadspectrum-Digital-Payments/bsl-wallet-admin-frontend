"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import OverviewContent from "@/components/overview/OverviewContent";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const OverviewPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <OverviewContent/>
        </DashboardLayout>
    )
}

export default OverviewPage