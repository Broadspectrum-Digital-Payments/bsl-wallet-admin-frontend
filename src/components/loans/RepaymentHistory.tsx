import React from "react";
import {ReceiptPercentIcon} from "@heroicons/react/24/outline";
import {useLoanStore} from "@/store/LoanStore";
import ListItem from "@/components/ListItem";
import Link from "next/link";
import Badge from "@/components/Badge";

const LoanRepaymentHistory: React.FC = () => {
    const {loan} = useLoanStore()
    const loans = [
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        },
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        },
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        },
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        },
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        },
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        },
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        },
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        },
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        },
        {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            status: 'online',
        }
    ]

    return (
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">

            <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                {loans.map((loan) => (
                    <li key={loan.handle}>
                        <div className="group relative flex items-center px-5 py-2">
                            <Link href={loan.href} className="-m-1 block flex-1 p-1">
                                <div className="absolute inset-0 group-hover:bg-gray-50"
                                     aria-hidden="true"/>
                                <div className="relative flex min-w-0 flex-1 items-center">
                                    <span className="relative inline-block flex-shrink-0 mr-5">
                                        <ReceiptPercentIcon className="h-8 w-8 rounded-full"/>
                                      <span
                                          className={`${loan.status === 'online' ? 'bg-green-400' : 'bg-gray-300'}
                                              absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white`
                                          }
                                          aria-hidden="true"
                                      />
                                    </span>
                                    <ListItem title={loan.name} description={loan.handle} customClasses="flex-col"/>
                                </div>
                            </Link>

                            <Badge text={loan.status}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LoanRepaymentHistory
