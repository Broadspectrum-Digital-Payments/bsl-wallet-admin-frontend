import React, {Fragment, useEffect} from "react";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {useDashboardStore} from "@/store/DashboardStore";
import {useUserStore} from "@/store/UserStore";
import {LockClosedIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {IconsType} from "@/utils/types/IconType";
import Avatar from 'react-avatar';
import {MenuItemType} from "@/utils/types/MenuItemType";

const ProfileDropdown: React.FC = () => {
    const {profileDropdownItems, setActiveSidebarMenu} = useDashboardStore()
    const {user} = useUserStore()

    const getIcons: IconsType = {
        account: <UserCircleIcon className="h-5 w-5 shrink-0 mr-1" aria-hidden="true"/>,
        logout: <LockClosedIcon className="h-5 w-5 shrink-0 mr-1" aria-hidden="true"/>,
    };

    useEffect(() => {
    }, []);

    const handleActiveMenuItemClick = (menuItem: MenuItemType) => {
        if (menuItem.name === 'account') {
            if (setActiveSidebarMenu) setActiveSidebarMenu(
                {name: 'settings', label: 'Settings', href: '/settings', icon: true, category: ''})
        }
    }

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <Avatar name={user?.name} size="35" color="white" fgColor="black" round
                        style={{border: '1px solid #4b5563'}}/>

                <span className="hidden lg:flex lg:items-center">
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                </span>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-6 min-w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <div
                        key={'person.email'}
                        className="relative flex items-center rounded-lg bg-white px-6 py-2 truncate"
                    >
                        <div className="min-w-0 flex-1">
                            <span className="absolute inset-0" aria-hidden="true"/>
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="truncate text-sm text-gray-500">Admin</p>
                        </div>

                        <div className="absolute inset-0 flex items-end" aria-hidden="true">
                            <div className="divide-y w-full border-t border-gray-200"/>
                        </div>
                    </div>

                    {profileDropdownItems.map((menuItem) => (
                        <Menu.Item key={menuItem.name}>
                            {({active}) => (
                                <Link
                                    onClick={() => handleActiveMenuItemClick(menuItem)}
                                    href={menuItem.href}
                                    className={
                                        `${active ? 'bg-gray-50 ' : ''} flex items-center px-5 py-2 text-sm leading-6 text-gray-900`}
                                >
                                    {menuItem.icon && getIcons[menuItem.name]}
                                    {menuItem.label}
                                </Link>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ProfileDropdown