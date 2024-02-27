import {transactionFetcher, walletFetcher} from "@/api/http";
import {downloadFile, getJSONHeaders} from "@/utils/helpers";


const TRANSACTION_ENDPOINT = 'v1/admin/transactions'
export async function listTransactions(bearerToken: string = '', params: string = '') {
    return await transactionFetcher(`${TRANSACTION_ENDPOINT}?${params}`, {
        headers: getJSONHeaders(bearerToken),
    });
}

export async function downloadTransactions(params: string = '', fileName: string = 'transactionReport.csv') {
    const response = await walletFetcher(`v1/admin/reports/transactions/download?${params}`, {
        headers: getJSONHeaders(),
    });

    return await downloadFile(response, fileName)
}