import {TransactionGraphDataType} from "@/utils/types/TranasctionGraphDataType";

export interface IBarGraphDataOption {
    key: string;
    color?: string;
}

export interface IReBarGraphProps {
    data: any[];
    dataOptionSet: IBarGraphDataOption[];
    options: {
        tooltip?: boolean;
    };
}

export interface IAreaGraphProps {
    data: TransactionGraphDataType[]
    dataKey: string
    customClasses: string
}