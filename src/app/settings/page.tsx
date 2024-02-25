"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";
import SettingsContent from "@/components/settings/SettingsContent";

const SettingsPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <SettingsContent/>
        </DashboardLayout>
    )
}

export default SettingsPage