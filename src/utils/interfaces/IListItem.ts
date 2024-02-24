import React from "react";

export interface IListItem {
    children?: React.ReactNode,
    title?: string,
    description?: string
    customClasses?: string
}