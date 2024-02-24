import React from 'react';
import {ISvgProps} from "@/utils/interfaces/ISvgProps";
import Image from "next/image";
import {IDetailsKeyValueProps} from "@/utils/interfaces/IDetailsKeyValueProps";

const DetailsKeyValue: React.FC<IDetailsKeyValueProps> = ({title, value}) => {
    return (
        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">{title}</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{value}</dd>
        </div>
    );
};

export default DetailsKeyValue;