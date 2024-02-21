"use client"
import React from 'react';
import Link from 'next/link';
import {useDashboardStore} from '@/store/DashboardStore';
import {IMenuItem} from '@/utils/interfaces/IMenuItem';
import {
    ChartPieIcon,
    Cog6ToothIcon,
    CogIcon,
    UsersIcon,
    UserCircleIcon,
    LockClosedIcon,
    RectangleGroupIcon,
    Squares2X2Icon,
    BanknotesIcon,
    ArrowsRightLeftIcon,
    BuildingOffice2Icon,
    WalletIcon,
} from '@heroicons/react/24/outline';
import {IconsType} from "@/utils/types/IconType";

const MenuItem: React.FC<IMenuItem> = ({menuItem}) => {
    const {activeSidebarMenu, setActiveSidebarMenu} = useDashboardStore();

    const handleMenuItemClicked: React.MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault()
        if (setActiveSidebarMenu) setActiveSidebarMenu(menuItem)
    };

    const getIcons: IconsType = {
        overview: <Squares2X2Icon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        admins: <RectangleGroupIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        customers: <UsersIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        agents: <BuildingOffice2Icon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        lenders: <BanknotesIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        loans: <WalletIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        transactions: <ArrowsRightLeftIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        reports: <ChartPieIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        merchants: <UserCircleIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        logout: <LockClosedIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
        settings: <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>,
    };

    return (
        <li key={menuItem.name}>
            {menuItem.category && (
                <div className="gap-x-3 p-2 text-xs font-semibold leading-6 text-gray-400">
                    {menuItem.category}
                </div>
            )}

            <div onClick={handleMenuItemClicked}>
                <Link
                    href={menuItem.href}
                    className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                        menuItem.name.trim().toLowerCase() === activeSidebarMenu?.name.trim().toLowerCase()
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                >
                    {menuItem.icon && getIcons[menuItem.name]}
                    {menuItem.label}
                </Link>
            </div>
        </li>
    );
};

export default MenuItem;
