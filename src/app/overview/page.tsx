"use client"
import React, {useEffect} from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import OverviewContent from "@/components/overview/OverviewContent";

const OverviewPage: React.FC = () => {
    return (
        <DashboardLayout>
            <OverviewContent/>
        </DashboardLayout>
    )
}

export default OverviewPage