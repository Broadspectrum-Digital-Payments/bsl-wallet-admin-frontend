"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminList from '@/components/admins/AdminList';
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";

const AdminsPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <AdminList/>
        </DashboardLayout>
    )
}

export default AdminsPage