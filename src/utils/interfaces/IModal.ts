import React from "react";

export interface IModal {
    showModal: boolean;
    showCloseButton: boolean;
    setModalOpen: (b: boolean) => void;
    customClasses?: string;
    children?: React.ReactNode
}