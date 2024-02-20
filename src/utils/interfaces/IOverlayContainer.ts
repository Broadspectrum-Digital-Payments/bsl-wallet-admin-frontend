import React from "react";

export interface IOverlayContainer {
    children?: React.ReactNode,
    customClasses?: string,
    open?: boolean,
    setOpen: (open: boolean) => void
}