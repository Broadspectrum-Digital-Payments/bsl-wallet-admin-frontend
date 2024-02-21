import React from "react";

export interface ITable {
    children: {
        headers?: ITableHeader[],
        body?: React.ReactNode,
    },
    customClasses?: string,
    buttonText?: string,
    onButtonClick?: () => void,
}

export interface ITableHeader {
    label: string;
    classes: string;
}

export interface ITableData {
    label: string;
    customClasses: string;
    children?: React.ReactNode,
}