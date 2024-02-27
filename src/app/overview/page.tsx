"use client"
import React, {useEffect} from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import OverviewContent from "@/components/overview/OverviewContent";
import mainMenuItemsList from "@/components/layout/MainMenuItemsList";
import {useAdminStore} from "@/store/AdminStore";

const OverviewPage: React.FC = () => {
    const {setActiveSidebarMenu} = useAdminStore()
    useEffect(() => {
        if (setActiveSidebarMenu) setActiveSidebarMenu(mainMenuItemsList[0])
    }, []);


    return (
        <DashboardLayout>
            <OverviewContent/>
        </DashboardLayout>
    )
}

export default OverviewPage