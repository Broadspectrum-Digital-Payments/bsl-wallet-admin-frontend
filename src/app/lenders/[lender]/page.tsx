"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LenderShow from "@/components/lenders/LenderShow";

export default function LenderDetailsPage() {
    return (
        <DashboardLayout>
            <LenderShow/>
        </DashboardLayout>
    )
}