import React from 'react';
import {ButtonType} from "@/utils/types/ButtonType";

const ApproveButton: React.FC<ButtonType> = ({
                                          children,
                                          buttonType,
                                          styleType,
                                          customStyles,
                                          disabled,
                                          onClick
                                      }) => {
    const getBackgroundColor = (styleType: string) => {
        return styleType === 'secondary' ? '#EFEFEF' : styleType === 'tertiary' ? 'transparent' : '#1e293b';
    }

    const getTextColor = (styleType: string, disabled: boolean | undefined) => {
        if (disabled) return styleType === 'secondary' ? '#4F4F4F' : styleType === 'tertiary' ? '#1e293b' : '#FFFFFF';
        return styleType === 'primary' ? '#20e147' : '#1e293b';
    }

    const getHoverBackgroundColor = (styleType: string) => styleType === 'secondary' ? 'bg-gray-200 hover:bg-gray-300'
        : styleType === 'tertiary' ? 'bg-white hover:bg-white' : 'bg-slate-800 hover:bg-slate-900';

    const getHoverTextColor = (styleType: string) => styleType === 'secondary' ? 'text-slate-800 hover:text-slate-900' : 'text-white hover:text-white';

    const defaultStyles: React.CSSProperties = {
        width: '100%',
        maxHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: '#47e120',
        color: getTextColor(styleType, disabled),
        transition: 'background 0.3s, color 0.3s',
        opacity: disabled ? 0.5 : 1
    };

    return (
        <button
            type={buttonType}
            className={`${customStyles} ${disabled ? '' : getHoverBackgroundColor(styleType)} ${disabled ? '' : getHoverTextColor(styleType)}`}
            style={{...defaultStyles}}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ApproveButton;