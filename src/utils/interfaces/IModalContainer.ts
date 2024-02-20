import React from "react";

export interface IModalContainer {
    children?: React.ReactNode,
    customClasses?: string,
    open?: boolean,
    setOpen: (open: boolean) => void
}