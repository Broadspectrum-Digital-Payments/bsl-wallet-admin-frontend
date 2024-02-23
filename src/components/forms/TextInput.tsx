import React, {ChangeEvent, WheelEventHandler, useState} from 'react';
import {ITextInput} from "@/utils/interfaces/ITextInput";
import {camelCaseToWords, isValidEmail} from "@/utils/helpers";
import Svg from "@/components/Svg";

const TextInput: React.FC<ITextInput> = ({
                                             label,
                                             id,
                                             name,
                                             type,
                                             autoComplete,
                                             required,
                                             placeholder,
                                             onInputChange,
                                             hasError,
                                             passwordIcon,
                                             height = 40,
                                             disabled = false,
                                             children,
                                             customClasses,
                                             customInputClasses,
                                             customLabelClasses = 'capitalize',
                                             min,
                                             max,
                                             value = '',
                                         }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value ?? value;
        setInputValue(inputValue);
        // if (inputValue !== '') handleBlur();
        if (onInputChange) onInputChange(event);
    };

    const handleBlur = () => {
        if (inputValue === '' && required && !value) {
            setError(`${capitalize(camelCaseToWords(name))} is required!`);
            if (hasError) hasError(true);
        } else if (type === 'email' && !isValidEmail(inputValue) && !isValidEmail(value)) {
            setError('Please enter a valid email address.');
            if (hasError) hasError(true);
        } else {
            setError('');
            if (hasError) hasError(false);
        }
    };

    const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

    const togglePassword = () => {
        return setShowPassword(!showPassword);
    };

    const isNumberInput = () => {
        return type === 'number'
    };

    const numberInputOnWheelPreventChange: WheelEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const input = event.currentTarget;
        input.blur();
        setTimeout(() => input.focus(), 0);
    }

    return (
        <div className={`mb-4 ${customClasses}`}>
            <label htmlFor={id} className={`block text-sm font-medium leading-6 text-gray-900 ${customLabelClasses}`}>
                {label}
            </label>
            <div className=" mt-2 flex flex-col gap-y-2">
                <div className="sm:col-span-12 rounded-md">
                    <div
                        className={`flex rounded-md border border-gray-300 sm:min-w-md ${
                            error ? 'border-red-400' : 'focus:border-slate-900'
                        } focus-within:border-slate-900 relative`}>
                        {children?.left}
                        <input
                            id={id}
                            name={name}
                            type={showPassword ? 'text' : type}
                            step="any"
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                            onBlur={handleBlur}
                            onInput={handleInputChange}
                            min={isNumberInput() ? min : ''}
                            max={isNumberInput() ? max : ''}
                            className={`block w-full rounded-md py-2 px-3 text-gray-900 placeholder-gray-900
                                    border-gray-500 placeholder:text-gray-600 focus:outline-none
                                    sm:text-sm sm:leading-6 h-[${height}px] ${disabled ? 'cursor-not-allowed' : ''} 
                                    ${customInputClasses}`}
                            disabled={disabled}
                            onWheel={numberInputOnWheelPreventChange}
                            value={value}
                        />

                        {children?.right && (
                            <div className="absolute right-0 flex truncate h-full z-20">
                                {children?.right}
                            </div>
                        )}

                        {type === 'password' && passwordIcon && (
                            <div
                                className="absolute inset-y-0 right-1 flex items-center cursor-pointer bg-transparent m-2"
                                onClick={togglePassword}
                            >
                                <Svg name={showPassword ? "eye-opened.svg" : "eye-slash.svg"}
                                     customClasses={error ? "text-red-500" : ""}/>
                            </div>
                        )}
                    </div>
                    {error && <p className="flex text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default TextInput;