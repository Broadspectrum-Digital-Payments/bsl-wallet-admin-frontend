import React from "react";

export type ButtonType = {
    children?: React.ReactNode;
    customStyles?: string;
    buttonType: 'submit' | 'button' | 'reset';
    styleType: string;
    disabled?: boolean;
    onClick?: () => void;
}