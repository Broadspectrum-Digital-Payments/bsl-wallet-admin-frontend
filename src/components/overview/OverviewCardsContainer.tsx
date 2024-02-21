import SectionCard from "@/components/SectionCard";
import React from "react";
import Slider from "@/components/overview/Slider";

const OverviewCardsContainer = () => {
    const pages = [
        {
            id: 1,
            name: 'Merchants',
            color: 'sky',
            background: 'bg-sky-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'assets.gif',
            href: '/merchants',
        },
        {
            id: 2,
            name: 'Customers',
            color: 'gray',
            background: 'bg-gray-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'maintenance.gif',
            href: '/customers',
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
            name: 'Loans',
            color: 'fuchsia',
            background: 'bg-fuchsia-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'reports.gif',
            href: '/loans'
        },
    ]

    return (
        <div className="w-full flex">
            <Slider customClasses="gap-5">
                {pages.map((page) => (
                    <SectionCard key={page.id} item={page} customClasses="max-w-sm carousel-item"/>
                ))}
            </Slider>
        </div>
    )
}

export default OverviewCardsContainer