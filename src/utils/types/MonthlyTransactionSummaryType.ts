export type MonthData = {
    disbursementCount: number;
    collectionCount: number;
    collectionValue: number;
    disbursementValue: number;
}

export type MonthlyTransactionSummaryType = {
    [month: string]: MonthData;
}