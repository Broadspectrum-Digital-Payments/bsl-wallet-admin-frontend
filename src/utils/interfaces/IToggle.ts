import React from "react";

export interface IToggle {
    enabled: boolean;
    handleToggle: (enabled: boolean) => void;
    children?: React.ReactNode;
}