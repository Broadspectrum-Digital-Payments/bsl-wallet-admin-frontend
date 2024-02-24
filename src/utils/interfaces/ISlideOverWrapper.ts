import React from "react";

export interface ISlideOverWrapper {
    children?: React.ReactNode,
    setOpen?: (open: boolean) => void,
    open: boolean
}