import SectionCard from "@/components/SectionCard";
import React from "react";
import Slider from "@/components/overview/Slider";
import {useAdminStore} from "@/store/AdminStore";

const OverviewCardsContainer = () => {
    const adminPages = [
        {
            id: 1,
            name: 'Lenders',
            color: 'sky',
            background: 'bg-sky-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'assets.gif',
            href: '/lenders',
        },
        {
            id: 2,
            name: 'Loans',
            color: 'gray',
            background: 'bg-gray-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'maintenance.gif',
            href: '/loans',
        },
        {
            id: 3,
            name: 'Transactions',
            color: 'teal',
            background: 'bg-teal-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'users.gif',
            href: '/transactions'
        },
        {
            id: 4,
            name: 'Customers',
            color: 'fuchsia',
            background: 'bg-fuchsia-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'reports.gif',
            href: '/customers'
        },
    ]
    const lenderPages = [
        {
            id: 1,
            name: 'Loans',
            color: 'sky',
            background: 'bg-sky-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'assets.gif',
            href: '/loans',
        },
        {
            id: 1,
            name: 'Settings',
            color: 'gray',
            background: 'bg-gray-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'maintenance.gif',
            href: '/settings',
        },
    ]
    const {authenticatedAdmin} = useAdminStore()

    return (
        <div className="w-full flex">
            <Slider customClasses="gap-5">
                {authenticatedAdmin && authenticatedAdmin.userType === 'lender' ? lenderPages.map((page) => (
                    <SectionCard key={page.id} item={page} customClasses="max-w-sm carousel-item"/>
                )) : adminPages.map((page) => (
                    <SectionCard key={page.id} item={page} customClasses="max-w-sm carousel-item"/>
                ))}
            </Slider>
        </div>
    )
}

export default OverviewCardsContainer