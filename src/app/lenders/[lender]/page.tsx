"use client"
import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {
    ChartBarSquareIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {Bars3Icon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import DashboardLayout from "@/components/layout/DashboardLayout";
import CustomerShow from "@/components/customers/CustomerShow";
import LenderShow from "@/components/lenders/LenderShow";

export default function MerchantDetailsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const secondaryNavigation = [
        {name: 'Account', href: '#', current: true},
        {name: 'Notifications', href: '#', current: false},
        {name: 'Billing', href: '#', current: false},
        {name: 'Teams', href: '#', current: false},
        {name: 'Integrations', href: '#', current: false},
    ]
    
    return (
        <DashboardLayout>
            <LenderShow></LenderShow>
        </DashboardLayout>
    )
}