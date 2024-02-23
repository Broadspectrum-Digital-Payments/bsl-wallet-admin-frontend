import React, {useState} from 'react';
import Datepicker from "tailwind-datepicker-react"
import Svg from "@/components/Svg";

const DatePicker: React.FC<IDatePickerProps> = ({selectedDate, setSelectedDate, minDate, disabled = false, error}) => {
    const [show, setShow] = useState<boolean>(false)

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return new Date(`${year}-${month}-${day}`);
    };

    const handleClearButtonClick = () => {
        setSelectedDate(getCurrentDate());
    };

    const options: object = {
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: null,
        clearBtnClick: handleClearButtonClick,
        minDate: minDate ?? null,
        theme: {
            background: "bg-white dark:bg-gray-700",
            todayBtn: "bg-gray-100 focus:outline-none",
            clearBtn: "bg-gray-100 text-purple-900 focus:outline-none outline-none border-0 p-2 font-normal w-1/3 grid ml-auto mr-3",
            icons: <span><Svg name="calendar.svg"/></span>,
            text: "",
            disabledText: "",
            input: `h-[42px] focus:outline-none focus:border-purple-900 bg-transparent ${error ? 'border-red-500' : ''}`,
            inputIcon: <span><Svg name="calendar.svg"/></span>,
            selected: "bg-purple-900",
        },
        icons: {
            prev: () => <span className="focus:outline-none hover:bg-transparent border-0">
                <Svg name="arrow-circle-left.svg"/></span>,
            next: () => <span><Svg name="arrow-circle-right.svg"/></span>
        },
        datepickerClassNames: "top-[65px] flex-grow border rounded-lg",
        defaultDate: null,
        language: "en",
        disabledDates: [],
        weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric"
        },
        disabled: disabled
    }

    return (
        <>
            <Datepicker classNames={`relative z-10 ${disabled ? 'pointer-events-none opacity-50' : ''}`}
                        options={options}
                        onChange={setSelectedDate} show={show} setShow={setShow}/>
            {error && <p className="flex text-red-400 text-sm mt-2">{error}</p>}
        </>
    )
}

export default DatePicker;
