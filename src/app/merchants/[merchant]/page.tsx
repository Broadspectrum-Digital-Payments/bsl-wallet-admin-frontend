"use client"
import React from "react";
import {useParams} from 'next/navigation';
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import Image from "next/image";
import {
    CalendarDaysIcon,
    CreditCardIcon,
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    UserCircleIcon,
    XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import {CheckCircleIcon} from '@heroicons/react/24/solid'

const AssetDetailsPage = () => {
    const params = useParams();

    const activity = [
        {id: 1, type: 'created', person: {name: 'Chelsea Hagon'}, date: '7d ago', dateTime: '2023-01-23T10:32'},
        {id: 2, type: 'edited', person: {name: 'Chelsea Hagon'}, date: '6d ago', dateTime: '2023-01-23T11:03'},
        {id: 3, type: 'sent', person: {name: 'Chelsea Hagon'}, date: '6d ago', dateTime: '2023-01-23T11:24'},
        {
            id: 4,
            type: 'commented',
            person: {
                name: 'Chelsea Hagon',
                imageUrl:
                    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
            date: '3d ago',
            dateTime: '2023-01-23T15:56',
        },
        {id: 5, type: 'viewed', person: {name: 'Alex Curren'}, date: '2d ago', dateTime: '2023-01-24T09:12'},
        {id: 6, type: 'paid', person: {name: 'Alex Curren'}, date: '1d ago', dateTime: '2023-01-24T09:20'},
    ]

    return (
        <DashboardLayout>
            <>
                <div className="max-w-full sm:px-0">
                    <header className="relative isolate">
                        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                            <div
                                className="absolute left-20 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                                <div
                                    className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                                    style={{
                                        clipPath:
                                            'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                                    }}
                                />
                            </div>
                        </div>

                        <div className="max-w-full py-10 sm:px-6">
                            <div
                                className="flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                                <div className="flex items-center gap-x-6">
                                    <img
                                        src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                                        alt=""
                                        className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10 hidden sm:flex"
                                    />
                                    <h1>
                                        <div className="text-sm leading-6 text-gray-500">
                                            CRV <span className="text-gray-700">Sedan</span>
                                        </div>
                                        <div className="mt-1 text-base font-semibold leading-6 text-gray-900">
                                            Toyota
                                        </div>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                <main className="py-10">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* Invoice summary */}
                        <div className="lg:col-start-3 lg:row-end-1">
                            <h2 className="sr-only">Summary</h2>
                            <div className="rounded-lg shadow-md ring-1 ring-gray-900/5 z-50">
                                <div className="flex items-center justify-center">
                                    <Image
                                        src="/assets/images/vehicle-details.png"
                                        alt="vehicle details"
                                        className="flex sm:w-50 "
                                        width={300}
                                        height={100}
                                        style={{height: "auto", width: 300}}
                                    />
                                </div>


                                <dl className="flex flex-wrap">
                                    <div className="flex-auto pl-6 pt-6">
                                        <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                                        <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$10,560.00</dd>
                                    </div>

                                    <div
                                        className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">Client</span>
                                            <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
                                    </div>
                                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">Due date</span>
                                            <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd className="text-sm leading-6 text-gray-500">
                                            <time dateTime="2023-01-31">January 31, 2023</time>
                                        </dd>
                                    </div>
                                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6 mb-5">
                                        <dt className="flex-none">
                                            <span className="sr-only">Status</span>
                                            <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                                        </dt>
                                        <dd className="text-sm leading-6 text-gray-500">Paid with MasterCard</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Invoice */}
                        <div
                            className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                            <h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
                            <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">Issued on</dt>
                                    {' '}
                                    <dd className="inline text-gray-700">
                                        <time dateTime="2023-23-01">January 23, 2023</time>
                                    </dd>
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">Due on</dt>
                                    {' '}
                                    <dd className="inline text-gray-700">
                                        <time dateTime="2023-31-01">January 31, 2023</time>
                                    </dd>
                                </div>
                                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                                    <dt className="font-semibold text-gray-900">From</dt>
                                    <dd className="mt-2 text-gray-500">
                                        <span className="font-medium text-gray-900">Acme, Inc.</span>
                                        <br/>
                                        7363 Cynthia Pass
                                        <br/>
                                        Toronto, ON N3Y 4H8
                                    </dd>
                                </div>
                                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                                    <dt className="font-semibold text-gray-900">To</dt>
                                    <dd className="mt-2 text-gray-500">
                                        <span className="font-medium text-gray-900">Tuple, Inc</span>
                                        <br/>
                                        886 Walter Street
                                        <br/>
                                        New York, NY 12345
                                    </dd>
                                </div>
                            </dl>
                            <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                                <colgroup>
                                    <col className="w-full"/>
                                    <col/>
                                    <col/>
                                    <col/>
                                </colgroup>
                                <thead className="border-b border-gray-200 text-gray-900">
                                <tr>
                                    <th scope="col" className="px-0 py-3 font-semibold">
                                        Projects
                                    </th>
                                    <th scope="col"
                                        className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                                        Hours
                                    </th>
                                    <th scope="col"
                                        className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                                        Rate
                                    </th>
                                    <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                                        Price
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {/*{invoice.items.map((item) => (*/}
                                {/*    <tr key={item.id} className="border-b border-gray-100">*/}
                                {/*        <td className="max-w-0 px-0 py-5 align-top">*/}
                                {/*            <div className="truncate font-medium text-gray-900">{item.title}</div>*/}
                                {/*            <div className="truncate text-gray-500">{item.description}</div>*/}
                                {/*        </td>*/}
                                {/*        <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">*/}
                                {/*            {item.hours}*/}
                                {/*        </td>*/}
                                {/*        <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">*/}
                                {/*            {item.rate}*/}
                                {/*        </td>*/}
                                {/*        <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.price}</td>*/}
                                {/*    </tr>*/}
                                {/*))}*/}
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
                                        Subtotal
                                    </th>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                                    >
                                        Subtotal
                                    </th>
                                    {/*<td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">{invoice.subTotal}</td>*/}
                                </tr>
                                <tr>
                                    <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                                        Tax
                                    </th>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                                    >
                                        Tax
                                    </th>
                                    {/*<td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{invoice.tax}</td>*/}
                                </tr>
                                <tr>
                                    <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                                        Total
                                    </th>
                                    <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                                    >
                                        Total
                                    </th>
                                    {/*<td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">*/}
                                    {/*    {invoice.total}*/}
                                    {/*</td>*/}
                                </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="lg:col-start-3">
                            {/* Activity feed */}
                            <h2 className="text-sm font-semibold leading-6 text-gray-900">Activity</h2>
                            <ul role="list" className="mt-6 space-y-6">
                                {activity.map((activityItem, activityItemIdx) => (
                                    <li key={activityItem.id} className="relative flex gap-x-4">
                                        <div
                                            className={`${activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6'}
                                                    absolute left-0 top-0 flex w-6 justify-center`}
                                        >
                                            <div className="w-px bg-gray-200"/>
                                        </div>
                                        {activityItem.type === 'commented' ? (
                                            <>
                                                {/*<img*/}
                                                {/*    src={activityItem.person?.imageUrl}*/}
                                                {/*    alt=""*/}
                                                {/*    className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"*/}
                                                {/*/>*/}
                                                <div
                                                    className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                                                    <div className="flex justify-between gap-x-4">
                                                        <div className="py-0.5 text-xs leading-5 text-gray-500">
                                                                <span
                                                                    className="font-medium text-gray-900">{activityItem.person.name}</span> commented
                                                        </div>
                                                        <time
                                                            dateTime={activityItem.dateTime}
                                                            className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                                                        >
                                                            {activityItem.date}
                                                        </time>
                                                    </div>
                                                    {/*<p className="text-sm leading-6 text-gray-500">{activityItem?.comment}</p>*/}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div
                                                    className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                                    {activityItem.type === 'paid' ? (
                                                        <CheckCircleIcon className="h-6 w-6 text-indigo-600"
                                                                         aria-hidden="true"/>
                                                    ) : (
                                                        <div
                                                            className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"/>
                                                    )}
                                                </div>
                                                <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                                                        <span
                                                            className="font-medium text-gray-900">{activityItem.person.name}</span>{' '}
                                                    {activityItem.type} the invoice.
                                                </p>
                                                <time
                                                    dateTime={activityItem.dateTime}
                                                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                                                >
                                                    {activityItem.date}
                                                </time>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>

            </>
        </DashboardLayout>
    );
};

export default AssetDetailsPage;
