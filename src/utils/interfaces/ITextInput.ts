import React, {ReactNode, ReactElement, JSXElementConstructor} from "react";

export interface ITextInput {
    label: string
    id: string
    name: string
    type: string
    autoComplete?: string
    required?: boolean
    placeholder?: string
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    hasError?: (value: boolean) => void
    passwordIcon?: boolean
    disabled?: boolean
    children?: {
        left?: ReactNode | ReactElement<any, string | JSXElementConstructor<any>>
        right?: ReactNode | ReactElement<any, string | JSXElementConstructor<any>>
    }
    customClasses?: string
    customInputClasses?: string
    customLabelClasses?: string
    height?: number
    min?: number
    max?: number
    value?: string
}