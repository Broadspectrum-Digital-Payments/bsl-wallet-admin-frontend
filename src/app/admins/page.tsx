"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminList from '@/components/admins/AdminList';

const AdminsPage: React.FC = () => {
    return (
        <DashboardLayout>
            <AdminList/>
        </DashboardLayout>
    )
}

export default AdminsPage