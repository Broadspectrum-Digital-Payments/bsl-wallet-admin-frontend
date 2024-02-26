import {SelectInputItemType} from "@/utils/types/SelectInputItemType";

export interface ISmallCardOptions {
    data: SelectInputItemType[],
    label?: string
    customClasses?: string
    selected: SelectInputItemType
    setSelected: (selected: SelectInputItemType) => void
}