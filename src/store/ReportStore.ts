import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware';
import {ReportStoreType} from "@/utils/types/ReportStoreType";

export const useReportStore = create<ReportStoreType>()(
    devtools(
        persist(
            (set) => ({
                setReportType: (reportType) => set({reportType}),
                reportType: 'analytics',

                setLoading: (loading) => set({loading}),
                loading: false,

                resetReportStore: () => set({
                    reportType: '',
                    loading: false
                }),
            }),
            {name: 'report'},
        ),
    ),
)
