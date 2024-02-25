import React, {Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ISlideOverWrapper} from "@/utils/interfaces/ISlideOverWrapper";

const SlideOverWrapper: React.FC<ISlideOverWrapper> = ({open, setOpen, children, dialogTitle}) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <div className="fixed inset-0"/>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="p-6 bg-slate-800">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title
                                                    className="text-base font-semibold leading-6 text-white">{dialogTitle ?? 'Loans'}</Dialog.Title>
                                            </div>
                                        </div>
                                        {children}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default SlideOverWrapper