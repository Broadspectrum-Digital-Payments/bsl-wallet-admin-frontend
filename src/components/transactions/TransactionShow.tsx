import React, {useState} from 'react'

import {useTransactionStore} from "@/store/TransactionStore";
import DetailsKeyValue from "@/components/DetailsKeyValue";
import {formatAmount} from "@/utils/helpers";

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
                                    <div className="border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            <DetailsKeyValue  title="Transaction Id" value={transaction?.externalId ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Stan" value={transaction?.stan ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Type" value={transaction?.type ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Currency" value={transaction?.currency ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Account Name" value={transaction?.accountName ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Account Number" value={transaction?.accountNumber ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Amount" value={`${formatAmount(transaction.amount)}` ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Balance Before" value={`${formatAmount(transaction.balanceBefore)}` ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Balance After" value={`${formatAmount(transaction.balanceAfter)}` ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Fee" value={`${formatAmount(transaction?.fee)}` ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Status" value={transaction?.status ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Created At" value={transaction?.createdAt ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue  title="Description" value={transaction?.description ?? ''}></DetailsKeyValue>
                                            <DetailsKeyValue title="Account Issuer" value={transaction?.accountIssuer ?? ''}></DetailsKeyValue>
                                        </dl>
                                    </div>
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