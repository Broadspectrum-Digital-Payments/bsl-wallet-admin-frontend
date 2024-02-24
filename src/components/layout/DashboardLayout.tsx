"use client"
import React, {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useDashboardStore} from "@/store/DashboardStore";
import MainMenuItemsList from "@/components/layout/MainMenuItemsList";
import {IDashboardLayout} from "@/utils/interfaces/IDashboardLayout";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/16/solid";
import {
    BellIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import ProfileDropdown from "@/components/layout/ProfileDropdown";
import {useAdminStore} from "@/store/AdminStore";
import {useRouter} from "next/navigation";

const DashboardLayout: React.FC<IDashboardLayout> = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const {activeSidebarMenu} = useDashboardStore();

    const mainMenuItems = [
        {name: 'overview', label: 'Overview', href: '/overview', icon: true, category: 'Dashboard'},
        {name: 'admins', label: 'Admins', href: '/admins', icon: true, category: 'Management'},
        {name: 'lenders', label: 'Lenders', href: '/lenders', icon: true, category: ''},
        {name: 'agents', label: 'Agents', href: '/agents', icon: true, category: ''},
        {name: 'customers', label: 'Customers', href: '/customers', icon: true, category: ''},
        {name: 'kyc', label: 'KYC', href: '/kyc', icon: true, category: ''},
        {name: 'loans', label: 'Loans', href: '/loans', icon: true, category: 'Core'},
        {name: 'transactions', label: 'Transactions', href: '/transactions', icon: true, category: ''},
        {name: 'reports', label: 'Reports & Analytics', href: 'reports', icon: true, category: 'Other'},
    ]

    const userProfileMenuItems = [
        {name: 'account', label: 'Account', href: '/settings', icon: true, category: ''},
        {name: 'logout', label: 'Logout', href: '/', icon: true, category: ''},
    ]

    const bottomMenuItems = [
        {name: 'settings', label: 'Settings', href: '/settings', icon: true, category: 'Preference'},
    ]

    const {
        setMainMenuItemsList,
        setProfileDropdownItems,
        setBottomMenuItemsList
    } = useDashboardStore()

    useEffect(() => {
        setDashboard()
    }, []);

    const setDashboard = () => {
        if (setMainMenuItemsList) setMainMenuItemsList(mainMenuItems)
        if (setProfileDropdownItems) setProfileDropdownItems(userProfileMenuItems)
        if (setBottomMenuItemsList) setBottomMenuItemsList(bottomMenuItems)
    }

    return (
        <main className="">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80"/>
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5"
                                                onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div
                                    className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Image
                                            src="/assets/images/logo.svg"
                                            alt="wallet" className="h-8 w-auto" height={20} width={20}
                                            style={{width: "auto"}}/>
                                    </div>
                                    <MainMenuItemsList/>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="wallet" className="h-8 w-auto" height={20} width={20}
                            style={{width: "auto"}}/>
                    </div>
                    <MainMenuItemsList/>
                </div>
            </div>

            <div className="lg:pl-72 min-h-full">
                <div
                    className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>

                    <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"/>

                    <div className="capitalize" aria-hidden="true">{activeSidebarMenu?.label}</div>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>

                            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"/>

                            <ProfileDropdown/>
                        </div>
                    </div>
                </div>

                <div className="bg-white min-h-full">
                    <div className="p-4 sm:px-6 lg:p-8">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}


export default DashboardLayout