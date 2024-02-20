import React from 'react';
import {ISvgProps} from "@/utils/interfaces/ISvgProps";
import Image from "next/image";

const Svg: React.FC<ISvgProps> = ({name = '', width, height, customClasses}) => {
    return (
        <Image src={`/assets/icons/${name}`} alt={name} width={width ?? 24} height={height ?? 24}
               style={{height: 'auto'}} className={customClasses}/>
    );
};

export default Svg;
