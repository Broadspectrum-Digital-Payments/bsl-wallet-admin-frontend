import {walletFetcher} from "@/api/http";
import {downloadFile} from "@/utils/helpers";

export async function listTransactions(merchant?: string, authToken: string = '', params: string = '') {
    return await walletFetcher(`api/v1/merchants/${merchant}/transactions?${params}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });
}

export async function downloadReport(merchant?: string, authToken: string = '', params: string = '', fileName: string = 'merchant-report.csv') {
    const response = await walletFetcher(`api/v1/merchants/${merchant}/transactions/csv?${params}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    return await downloadFile(response, fileName)
}