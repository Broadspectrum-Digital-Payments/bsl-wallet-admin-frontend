import React from "react";

export interface IListBoxItem {
    id?: number;
    label: string;
    value: string;
    image?: string;
}

export interface IListBoxProps {
    data: IListBoxItem[];
    optionSelected: IListBoxItem;
    setOptionSelected: (item: IListBoxItem) => void
    children?: React.ReactNode;
    customClasses?: string;
    customButtonClasses?: string;
    disableFirstKey?: boolean
    disableButton?: boolean
}