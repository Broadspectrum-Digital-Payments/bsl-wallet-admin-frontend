"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const SettingsPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <div>
                Settings works!
            </div>
        </DashboardLayout>
    )
}

export default SettingsPage