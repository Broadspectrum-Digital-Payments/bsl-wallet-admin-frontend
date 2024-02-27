import {loanFetcher, walletFetcher} from "@/api/http";
import {downloadFile, getJSONHeaders} from "@/utils/helpers";

const LOAN_ENDPOINT = 'v1/loans'
const LENDER_ENDPOINT = 'v1/lenders/'

export async function listLoans(params: string = '') {
    return await loanFetcher(`${LOAN_ENDPOINT}?${params}`, {
        headers: getJSONHeaders(),
    });
}

export async function downloadLoans(params: string = '', fileName: string = 'loanReport.csv') {
    const response = await walletFetcher(`v1/admin/reports/loans/download?${params}`, {
        headers: getJSONHeaders(),
    });

    return await downloadFile(response, fileName)
}

export async function updateLoan(lenderExternalId: string, loanExternalId: string, data: object, bearerToken: string = '') {
    return await loanFetcher(`${LENDER_ENDPOINT}${lenderExternalId}/loans/${loanExternalId}`, {
        headers: getJSONHeaders(bearerToken),
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export async function showLoan(loanExternalId: string, bearerToken: string = '') {
    return await loanFetcher(`${LOAN_ENDPOINT}/${loanExternalId}`, {
        headers: getJSONHeaders(bearerToken),
    });
}