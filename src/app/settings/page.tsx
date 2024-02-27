"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import SettingsContent from "@/components/settings/SettingsContent";

const SettingsPage: React.FC = () => {
    return (
        <DashboardLayout>
            <SettingsContent/>
        </DashboardLayout>
    )
}

export default SettingsPage