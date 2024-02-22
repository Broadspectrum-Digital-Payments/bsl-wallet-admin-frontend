import React, {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon} from '@heroicons/react/20/solid'
import {IDropdownInputProps} from "@/utils/interfaces/IDropdownInputProps";
import Svg from "@/components/Svg";
import Image from "next/image";
import {isImageAvailable} from "@/utils/helpers";

export const DropdownInput: React.FC<IDropdownInputProps> = ({label, selected, setSelected, data, customClasses}) => {

    return (
        <Listbox value={selected} onChange={(value) => setSelected(value)}>
            {({open}) => (
                <div className={`relative w-full col-span-full ${customClasses}`}>
                    <Listbox.Label
                        className="max-w-full block text-sm font-medium leading-6 text-gray-900">{label}</Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button
                            className="relative min-w-full cursor-default rounded-md bg-white py-4 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 focus:outline-none sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                            {/*{isImageAvailable(selected?.name) &&*/}
                            {/*    <Image className="flex-shrink-0 rounded-full"*/}
                            {/*           src={`/assets/images/${selected?.name}.png`}*/}
                            {/*           alt={selected?.name ?? ''} width={20} height={20} style={{width: 'auto'}}/>}*/}
                                <span className="ml-3 block truncate">{selected?.name}</span>
                            </span>
                            <span
                                className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <Svg name="caret-down.svg"/>
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-2 max-h-56 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {data.map((item) => (
                                    <Listbox.Option
                                        key={item?.id}
                                        className={({active}) => `${active ? 'bg-violet-300 text-white' : 'text-gray-900'} relative cursor-pointer select-none py-2 pl-3 pr-9`}
                                        value={item}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <div className="flex items-center">
                                                    {/*{isImageAvailable(item.name) &&*/}
                                                    {/*    <Image className="flex-shrink-0 rounded-full"*/}
                                                    {/*           src={`/assets/images/${item.name}.png`} alt={item.name}*/}
                                                    {/*           width={20} height={20} style={{width: 'auto'}}/>}*/}
                                                    <span
                                                        className={`ml-3 block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                        {item.name}
                                                     </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={`${active ? 'text-white' : 'text-indigo-600'} absolute inset-y-0 right-0 flex items-center pr-4`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}