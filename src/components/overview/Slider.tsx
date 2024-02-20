import React from "react";
import {ISlider} from "@/utils/interfaces/ISlider";

const Slider: React.FC<ISlider> = ({children, customClasses}) => {

    return (
        <>
            <div className={`${customClasses} carousel`}>
                {children}
            </div>
        </>

    )
}

export default Slider