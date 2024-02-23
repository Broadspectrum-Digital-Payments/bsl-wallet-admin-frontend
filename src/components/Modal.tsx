import React, {Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import Svg from "@/components/Svg";
import {IModal} from "@/utils/interfaces/IModal";

const Modal: React.FC<IModal> = ({showCloseButton, showModal, setModalOpen, children, customClasses}) => {
    const handleModalClose = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setModalOpen(false);
    };

    return (
        <Transition.Root show={showModal ?? false} as={Fragment}>
            <Dialog as="div" className={`relative z-10 ${customClasses}`} onClose={setModalOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                {showCloseButton && <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <div
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                                        onClick={handleModalClose}>
                                        <Svg name="x-circle.svg"/>
                                    </div>
                                </div>}
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal;
