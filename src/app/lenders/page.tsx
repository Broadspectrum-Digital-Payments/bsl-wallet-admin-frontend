"use client"
import React from 'react'
import DashboardLayout from "@/components/layout/DashboardLayout";
import LenderList from "@/components/lenders/LenderList";
import {useAdminStore} from "@/store/AdminStore";
import {useAuthHelper} from "@/hooks/useAuthEffect";
import {useLenderStore} from "@/store/LenderStore";
import EmptyState from "@/components/EmptyState";

const LendersPage: React.FC = () => {
    const {isAuthenticated, setIsAuthenticated} = useAdminStore();
    const {lenders} = useLenderStore();
    useAuthHelper({
        isAuthenticated,
        setIsAuthenticated
    })

    return (
        <DashboardLayout>
            <>
                {lenders && lenders?.data.length > 0 && <LenderList/>}
                {!lenders && <EmptyState/>}
            </>
        </DashboardLayout>
    )
}

export default LendersPage;