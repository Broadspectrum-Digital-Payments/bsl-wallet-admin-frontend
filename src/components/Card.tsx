import React from 'react';
import {ICardProps} from "@/utils/interfaces/ICardProps";

const Card: React.FC<ICardProps> = ({children, backgroundImage, customStyles}) => {
    return (
        <div className={`overflow-hidden ${customStyles}`}
             style={{backgroundImage: backgroundImage}}>
            {children}
        </div>
    );
};

export default Card;
