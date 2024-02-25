import React, {useState} from 'react'

import {useTransactionStore} from "@/store/TransactionStore";
import DetailsKeyValue from "@/components/DetailsKeyValue";
import {formatAmount} from "@/utils/helpers";
import TransactionDetails from "@/components/transactions/TransactionDetails";

const CustomerShow: React.FC = () => {
    const {transaction} = useTransactionStore();

    const [activeSection, setActiveSection] = useState('Transaction Details');

    const secondaryNavigation = [
        {name: 'Transaction Details', href: '#', current: true},
    ]

    const handleNavigationClick = (sectionName: string) => {
        setActiveSection(sectionName);
    };


    return (
        <>
            <div className="">
                <main>
                    <header className="border-b border-white/5">
                        {/* Secondary navigation */}
                        <nav className="flex overflow-x-auto py-4">
                            <ul
                                role="list"
                                className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                            >
                                {secondaryNavigation.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={item.name == activeSection ? 'text-indigo-400' : ''}
                                            onClick={() => handleNavigationClick(item.name)}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </header>


                    {activeSection == 'Transaction Details' && (
                        <div className="divide-y divide-white/5">

                            <div className="flex lg:px-8 px-4 py-4">

                                <div>
                                    <TransactionDetails transaction={transaction}></TransactionDetails>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

        </>
    )
}

export default CustomerShow