export type ReportStoreType = {
    setReportType: (reportType: string) => void
    reportType: string,

    setLoading?: (loading: boolean) => void
    loading?: boolean

    resetReportStore?: () => void,
}