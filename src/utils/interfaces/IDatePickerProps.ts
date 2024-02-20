interface IDatePickerProps {
    selectedDate?: Date,
    setSelectedDate: (date: Date) => void,
    minDate: Date,
    disabled?: boolean,
    error?: string,
}