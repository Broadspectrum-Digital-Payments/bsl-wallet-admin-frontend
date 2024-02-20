import React from "react";

export interface IEmptyState {
    children?: React.ReactNode,
    defaultState?: boolean,
    hasPageInfo?: boolean,
    activities?: object[],
    customClasses?: string
}