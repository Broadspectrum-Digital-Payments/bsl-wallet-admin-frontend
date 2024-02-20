import SectionCard from "@/components/SectionCard";
import React from "react";
import Slider from "@/components/overview/Slider";

const OverviewCardsContainer = () => {
    const clients = [
        {
            id: 1,
            name: 'Assets',
            color: 'sky',
            background: 'bg-sky-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'assets.gif',
            href: '/assets',
        },
        {
            id: 2,
            name: 'Maintenance',
            color: 'gray',
            background: 'bg-gray-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'maintenance.gif',
            href: '/maintenance'
        },
        {
            id: 3,
            name: 'Users',
            color: 'teal',
            background: 'bg-teal-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'users.gif',
            href: '/users'
        },
        {
            id: 4,
            name: 'Reports',
            color: 'fuchsia',
            background: 'bg-fuchsia-100',
            description: 'We would like to ensure that your account is in safe hands. Verify your email today to enjoy the full features on the platform.',
            image: 'reports.gif',
            href: '/reports'
        },
    ]

    return (
        <div className="w-full flex">
            <Slider customClasses="gap-5">
                {clients.map((client) => (
                    <SectionCard item={client} customClasses="max-w-sm carousel-item"/>
                ))}
            </Slider>
        </div>
    )
}

export default OverviewCardsContainer