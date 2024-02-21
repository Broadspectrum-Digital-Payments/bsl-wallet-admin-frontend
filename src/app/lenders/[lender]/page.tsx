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
import CustomerShow from "@/app/customers/[customer]/CustomerShow";
import LenderShow from "@/app/lenders/[lender]/LenderShow";


export default function MerchantDetailsPage() {


    return (
        <DashboardLayout>
            <LenderShow></LenderShow>
        </DashboardLayout>
    )
}