export type PaginationType = {
    pageNumber: number
    offset: number
    size: number
    lastPage: boolean
    firstPage: boolean
    sorting?: {
        empty?: boolean
        unsorted?: boolean
        sorted?: boolean
    }
    totalPages: number
    totalElements: number
}