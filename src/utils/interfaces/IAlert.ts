import React from "react";

export interface IAlert {
    alertType?: string;
    description?: string;
    customClasses?: string;
    descriptionClasses?: string;
    children?: React.ReactNode
}