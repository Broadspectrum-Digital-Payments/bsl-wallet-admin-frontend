import {transactionFetcher, walletFetcher} from "@/api/http";
import {downloadFile, getJSONHeaders} from "@/utils/helpers";


const TRANSACTION_ENDPOINT = 'v1/admin/transactions'
export async function listTransactions(bearerToken: string = '', params: string = '') {
    return await transactionFetcher(`${TRANSACTION_ENDPOINT}?${params}`, {
        headers: getJSONHeaders(bearerToken),
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