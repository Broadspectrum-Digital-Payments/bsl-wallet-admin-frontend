"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import {useParams} from "next/navigation";
import CustomerShow from "@/app/customers/[customer]/CustomerShow";

const CustomersPage: React.FC = () => {
    const params = useParams();

    return (
        <DashboardLayout>
           <CustomerShow></CustomerShow>
        </DashboardLayout>
    )
}

export default CustomersPage