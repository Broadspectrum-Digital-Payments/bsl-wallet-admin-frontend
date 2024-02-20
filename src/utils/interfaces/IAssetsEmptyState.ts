import React from "react";
import {CategoryType} from "@/utils/types/CategoryType";

export interface IAssetsEmptyState {
    children?: React.ReactNode,
    onCategoryClick?: (category: CategoryType) => void,
}