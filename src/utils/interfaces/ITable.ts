import React from "react";

export interface ITable {
    children?: {
        headers?: React.ReactNode,
        body?: React.ReactNode,
        footer?: React.ReactNode,
    },
    customClasses?: string
}