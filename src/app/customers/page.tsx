"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import CustomerList from "@/components/customers/CustomerList";

const CustomersPage: React.FC = () => {
    return (
        <DashboardLayout>
           <CustomerList></CustomerList>
        </DashboardLayout>
    )
}

export default CustomersPage