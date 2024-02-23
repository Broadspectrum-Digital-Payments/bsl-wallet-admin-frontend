import {FilterFormDataType} from "@/utils/types/FilterFormDataType";

export interface ITransactionFilter {
    onChange: (data: FilterFormDataType) => void
    setHasError: (error: boolean) => void
    hasError: boolean
    submit: boolean
    reset: boolean
}