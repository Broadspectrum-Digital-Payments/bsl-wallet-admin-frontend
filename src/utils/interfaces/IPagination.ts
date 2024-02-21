import {PaginationType} from "@/utils/types/PaginationType";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";

export interface IPagination {
    pagination?: PaginationType
    handlePrevious?: () => void
    handleNext?: () => void
    setPageOption: (pageOption: IListBoxItem) => void
    pageOption: IListBoxItem
    perPageOptions: IListBoxItem[]
}