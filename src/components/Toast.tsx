import React, {Fragment, useState} from 'react'
import {Transition} from '@headlessui/react'
import {CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon, XCircleIcon} from '@heroicons/react/24/outline'
import {IToast} from "@/utils/interfaces/IToast";

const Toast: React.FC<IToast> = ({toastType, toastDescription}) => {
    const [show, setShow] = useState(true)
    const toastTypes: Record<string, string> = {
        success: 'text-green-400',
        info: 'text-blue-400',
        pending: 'text-orange-400',
        error: 'text-red-400',
        failed: 'text-red-400',
        completed: 'text-green-400',
    };

    return (
        <>
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        {['success', 'completed'].includes(toastType as string) &&
                                            <CheckCircleIcon className={`h-6 w-6 ${toastTypes[toastType]}`}
                                                             aria-hidden="true"/>}
                                        {['error', 'failed'].includes(toastType as string) &&
                                            <XCircleIcon className={`h-6 w-6 ${toastTypes[toastType]}`}
                                                         aria-hidden="true"/>}
                                        {['info', 'pending'].includes(toastType as string) &&
                                            <ExclamationTriangleIcon className={`h-6 w-6 ${toastTypes[toastType]}`}
                                                                     aria-hidden="true"/>}
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900 capitalize">{toastType}!</p>
                                        <p className="mt-1 text-sm text-gray-500">{toastDescription}</p>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}

export default Toast
