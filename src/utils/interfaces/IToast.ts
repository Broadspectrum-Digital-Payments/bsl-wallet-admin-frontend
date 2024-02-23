import React from "react";

export interface IToast {
    toastType?: string;
    toastDescription?: string;
    customClasses?: string;
    children?: React.ReactNode
}