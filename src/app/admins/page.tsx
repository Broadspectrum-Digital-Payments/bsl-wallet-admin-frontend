"use client"
import React, {useState} from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminList from './AdminList';


const AdminsPage: React.FC = () => {


    return (
        <DashboardLayout>
            <AdminList></AdminList>
        </DashboardLayout>
    )
}

export default AdminsPage