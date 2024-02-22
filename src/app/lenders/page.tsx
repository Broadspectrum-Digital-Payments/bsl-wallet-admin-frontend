"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LenderList from "@/components/lenders/LenderList";

const AssetsPage: React.FC = () => {
    return (
        <DashboardLayout>
          <LenderList></LenderList>
        </DashboardLayout>
    )
}

export default AssetsPage;