import React from "react";

export interface IFilterWrapper {
    onSubmit: (submit: boolean) => void
    onReset: (reset: boolean) => void
    hasError: boolean
    children?: React.ReactNode
}