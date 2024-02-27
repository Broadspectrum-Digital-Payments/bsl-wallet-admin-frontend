"use client"
import React, {useEffect} from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportsOverview from "@/components/reports/ReportsOverview";
import {useReportStore} from "@/store/ReportStore";
import {useDashboardStore} from "@/store/DashboardStore";

const ReportsPage: React.FC = () => {
    const {setReportType} = useReportStore();
    const {activeSidebarMenu} = useDashboardStore();

    useEffect(() => {
        if (activeSidebarMenu.name === 'reports') setReportType('analytics')
    }, [activeSidebarMenu]);

    return (
        <DashboardLayout>
            <ReportsOverview/>
        </DashboardLayout>
    )
}

export default ReportsPage