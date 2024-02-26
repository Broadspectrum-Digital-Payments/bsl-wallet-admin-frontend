import React from "react";
import {LoanStatItemType} from "@/utils/types/LoanStatItemType";

export interface ILoanStats {
    children?: React.ReactNode,
    data?: LoanStatItemType[],
    customClasses?: string
}