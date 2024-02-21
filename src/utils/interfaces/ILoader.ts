import React from "react";

export interface ILoader {
    type?: string
    customClasses?: string
    customWrapperClasses?: string
    customAnimationClasses?: string
    children?: React.ReactNode
}