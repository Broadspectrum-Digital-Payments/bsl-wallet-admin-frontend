import {DropdownInputItemType} from "@/utils/types/DropdownInputItemType";

export interface IDropdownInputProps {
    label?: string
    selected: DropdownInputItemType
    setSelected: (item: DropdownInputItemType) => void
    data: DropdownInputItemType []
    customClasses?: string
}