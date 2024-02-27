import React from "react";
import {LoanStatItemType} from "@/utils/types/LoanStatItemType";

export interface ITransactionList {
    downloadable?: boolean;
    filter?: boolean;
    stats?: LoanStatItemType[];
    customClasses?: string;
    children?: React.ReactNode
    passedParam?: string
}