import React from 'react';
import Svg from '@/components/Svg';
import {IAlert} from '@/utils/interfaces/IAlert';

const Alert: React.FC<IAlert> = ({
                                     alertType,
                                     description,
                                     customClasses,
                                     children,
                                     descriptionClasses,
                                 }) => {
    const alertIcons: Record<string, string> = {
        success: 'check-circle.svg',
        info: 'check-circle.svg',
        warning: 'check-circle.svg',
        error: 'x-circle-red.svg',
        failed: 'x-circle-red.svg',
        completed: 'check-circle.svg',
    };

    const alertIconColors: Record<string, string> = {
        success: '#008000',
        successful: '#008000',
        info: '#06b6d4',
        initiated: '#06b6d4',
        warning: '#F29339',
        queued: '#F29339',
        inProgress: '#F29339',
        error: '#EB2F2F',
        failed: '#EB2F2F',
        completed: '#000000',
    };

    const alertBackgroundColors: Record<string, string> = {
        success: '#0080001A',
        successful: '#0080001A',
        info: '#ECFEFF',
        initiated: '#ECFEFF',
        warning: '#F293391A',
        queued: '#F293391A',
        inProgress: '#F293391A',
        error: '#EB2F2F1A',
        failed: '#EB2F2F1A',
        completed: '#0000001A',
    };

    const getText = (text: string) => {
        return text.replace(/\s+/g, '').toLowerCase();
    };

    const alertTypeKey = getText(alertType ?? '');

    return (
        <div className={`rounded p-1 ${customClasses}`} style={{background: alertBackgroundColors[alertTypeKey]}}>
            <div className="flex items-center justify-between">
                <div className="flex-shrink-0 mx-1">
                    {alertType && <Svg customClasses={alertIconColors[alertTypeKey]} name={alertIcons[alertTypeKey]}/>}
                </div>
                {description && (
                    <p
                        className={`flex items-center gap-1 ${descriptionClasses}`}
                        style={{color: alertIconColors[alertTypeKey]}}
                    >
                        {description}
                    </p>
                )}
                <div className="flex-1 md:flex md:justify-between">{children}</div>
            </div>
        </div>
    );
};

export default Alert;
