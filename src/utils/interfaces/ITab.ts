import React from "react";

export interface ITab {
    name: string;
    label: string;
}

export interface ITabProps {
    selected?: ITab
    setSelected?: (tab: ITab) => void
    customClasses?: string
    children?: React.ReactNode
    data: ITab[]
}