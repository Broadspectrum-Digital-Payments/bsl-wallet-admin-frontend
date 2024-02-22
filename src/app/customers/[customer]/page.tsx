"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import {useParams} from "next/navigation";
import CustomerShow from "@/components/customers/CustomerShow";

const CustomersPage: React.FC = () => {
    return (
        <DashboardLayout>
           <CustomerShow></CustomerShow>
        </DashboardLayout>
    )
}

export default CustomersPage