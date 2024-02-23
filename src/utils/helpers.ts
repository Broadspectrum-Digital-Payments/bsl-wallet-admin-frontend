import {DateTime, DateTimeUnit} from "luxon";
import {MonthlyTransactionSummaryType} from "@/utils/types/MonthlyTransactionSummaryType";
import {ApiMetaType} from "@/utils/types/ApiMetaType";
import {PaginationType} from "@/utils/types/PaginationType";
import {ErrorType} from "@/utils/types/ErrorType";

export const camelCaseToWords = (text: string = '') => {
    return text.replace(/([A-Z])/g, ' $1').toLowerCase();
}

export const getInitials = (name: string = ''): string => {
    const words = name.split(' ');

    if (words.length === 0) {
        return 'OP'
    } else if (words.length === 1) {
        return words.map(word => word.substring(0, 2).toUpperCase()).join('')
    } else {
        return words.map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('');
    }
};

export const capitalizeFirstLetter = (text: string = ''): string => {
    return text.charAt(0).toUpperCase() + text.slice(1)
};

export const isImageAvailable = (imageSrc: string = '', extension: string = 'png') => {
    try {
        const image = new Image();
        image.src = `/assets/images/${imageSrc}.${extension}`;
        return image.complete;
    } catch (error) {
        console.error('Error checking image availability', error);
        return false;
    }
};

export const getGreeting = () => {
    let hour = new Date().getHours();
    return "Good " + (hour < 12 && "morning" || hour < 18 && "afternoon" || "evening")
};

export const splitName = (name: string) => {
    return name.split(' ')
};

export const getError = (error: ErrorType): string => {
    return error.message ?? ''
};

export const downloadFile = async (response: Response | Blob, fileName: string = 'sample.txt') => {
    try {
        const blob = (response instanceof Response) ? await response.blob() : response;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

export const formatAmount = (amount: number | string = 0, currency: string = 'GHS') => {
    return `${currency}  ${(new Intl.NumberFormat('en-GH', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(amount) / 100))}`
}

export const calculateDateRange = (range: number = 5, customStart: boolean = false, whereStart: DateTimeUnit = 'month') => {
    const endDate = DateTime.local();
    const dateDifference = endDate.minus({months: range})
    const startDate = customStart ? dateDifference.startOf(whereStart) : dateDifference
    return {
        startDate: startDate.toISODate(),
        endDate: endDate.toISODate(),
    };
}

export const getGraphTemplate = () => {
    const {startDate, endDate} = calculateDateRange()

    const template: MonthlyTransactionSummaryType = {};

    let currentDate = DateTime.fromFormat(startDate ?? '', 'yyyy-MM-dd').toJSDate();
    let endPeriod = DateTime.fromFormat(endDate ?? '', 'yyyy-MM-dd').toJSDate();
    while (currentDate <= endPeriod) {
        const monthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(currentDate);

        template[monthName.toLowerCase()] = {
            disbursementCount: 0,
            collectionCount: 0,
            collectionValue: 0,
            disbursementValue: 0,
        };

        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return template;
};

export const plotGraphData = (data: MonthlyTransactionSummaryType = {}) => {
    const graphTemplate = getGraphTemplate();

    return Object.entries(graphTemplate).reduce(
        (accumulator, [month, values]) => {
            const {collectionCount, collectionValue, disbursementCount, disbursementValue} = values;
            const period = capitalizeFirstLetter(month.slice(0, 3));

            const volumeEntry = {
                name: period,
                collections: data[month]?.collectionCount || collectionCount,
                disbursements: data[month]?.disbursementCount || disbursementCount,
            };

            const valueEntry = {
                name: period,
                collections: data[month]?.collectionValue
                    ? Number(formatAmount(String(data[month].collectionValue), ''))
                    : Number(collectionValue),
                disbursements: data[month]?.disbursementValue
                    ? Number(formatAmount(String(data[month].disbursementValue), ''))
                    : Number(disbursementValue),
            };

            accumulator.volume.push(volumeEntry);
            accumulator.value.push(valueEntry);
            return accumulator;
        },
        {volume: [], value: []} as { volume: any[]; value: any[] }
    );
};

export const getJSONHeaders = (bearerToken: string = '') => {
    return {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Admin-Header': 'bsl-wallet-admin',
    }
}

export const extractPaginationData = (meta: ApiMetaType): PaginationType => {
    return {
        from: meta.from,
        to: meta.to,
        totalElements: meta.total,
        firstPage: meta.onFirstPage,
        nextPage: meta.nextPage,
        previousPage: meta.previousPage,
        currentPage: meta.currentPage,
        lastPage: meta.onLastPage,
        pageSize: meta.numberOfRecords,
        rows: meta.pageSize
    }
};

export const getEmptyPaginationData = (): PaginationType => {
    return {
        from: 0,
        to: 0,
        totalElements: 0,
        firstPage: false,
        nextPage: null,
        previousPage: null,
        currentPage: null,
        lastPage: false,
        pageSize: 0,
        rows: 0
    }
};

export const isObjectEmpty = (obj: Record<string, any>): boolean => {
    return Object.keys(obj).length === 0;
}