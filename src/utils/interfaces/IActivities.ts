import React from "react";
import {ActivityType} from "@/utils/types/ActivityType";

export interface IActivities {
    children?: React.ReactNode,
    activities?: ActivityType[],
    customClasses?: string
}