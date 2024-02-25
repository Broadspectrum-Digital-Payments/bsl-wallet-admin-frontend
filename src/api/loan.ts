import {walletFetcher} from "@/api/http";
import {downloadFile, getJSONHeaders} from "@/utils/helpers";

const TRANSACTION_ENDPOINT = 'v1/admin/transactions'

export async function listLoans(params: string = '') {
    return await walletFetcher(`${TRANSACTION_ENDPOINT}?${params}`, {
        headers: getJSONHeaders(),
    });
}

export async function downloadLoans(params: string = '', fileName: string = 'loanReport.csv') {
    const response = await walletFetcher(`${TRANSACTION_ENDPOINT}/download?${params}`, {
        headers: getJSONHeaders(),
    });

    return await downloadFile(response, fileName)
}