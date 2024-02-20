import React, {Fragment} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import Svg from '@/components/Svg';
import {ITimePickerProps} from "@/utils/interfaces/ITimePickerProps";

const TimePicker: React.FC<ITimePickerProps> = ({
                                                    selectedTime,
                                                    showTimePicker,
                                                    onTimeSelected,
                                                }) => {

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours < 12 ? 'AM' : 'PM';
        const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        return `${formattedHours}:${minutes === 0 ? '00' : minutes} ${period}`;
    }

    const generateTimes = () => {
        const times = [];
        let currentTime = new Date(0);

        for (let i = 0; i < 48; i++) {
            times.push(formatTime(currentTime.toTimeString().split(' ')[0]));
            currentTime.setMinutes(currentTime.getMinutes() + 30);
        }
        return times;
    };

    const times = generateTimes();

    return (
        <Listbox value={selectedTime} onChange={onTimeSelected}>
            {({open}) => (
                <>
                    <div className="relative w-full">
                        <Listbox.Button
                            className="relative cursor-default rounded-md bg-white py-3 hover:cursor-pointer pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-900 sm:text-sm sm:leading-6 h-[56px] min-w-full">
                            <span className="w-full truncate">
                                <span className="truncate font-semibold flex items-center">{selectedTime ??
                                    <span className="text-sm text-gray-500 font-normal flex items-center">
                                        <Svg customClasses="pr-3" name="clock.svg"/> hh/mm</span>
                                }</span>
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
                                className="absolute z-10 mt-3 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border">
                                {times.map((time) => (
                                    <Listbox.Option
                                        key={time}
                                        className="relative cursor-default select-none m-2 py-2 pl-3 pr-9 hover:bg-gray-200 hover:rounded text-gray-900"
                                        value={time}
                                    >
                                        {({selected}) => (
                                            <div
                                                className={`flex truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                {time}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}

export default TimePicker;