import {fetcher} from "@/api/http";

export async function getStats(merchant?: string, authToken: string = '') {
    return await fetcher(`api/v1/merchants/${merchant}/stats`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });
}

export async function getTransactionSummary(merchant?: string, authToken: string = '', startDate: string = '', endDate: string = '') {
    return await fetcher(`api/v1/merchants/${merchant}/accounts/summary?start-date=${startDate}&end-date=${endDate}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        }
    });
}


