import {loanFetcher} from "@/api/http";
import {downloadFile, getJSONHeaders} from "@/utils/helpers";

const LOAN_ENDPOINT = 'v1/loans'

export async function listLoans(params: string = '') {
    return await loanFetcher(`${LOAN_ENDPOINT}?${params}`, {
        headers: getJSONHeaders(),
    });
}

export async function downloadLoans(params: string = '', fileName: string = 'loanReport.csv') {
    const response = await loanFetcher(`${LOAN_ENDPOINT}/download?${params}`, {
        headers: getJSONHeaders(),
    });

    return await downloadFile(response, fileName)
}

export async function updateLoan(id: string, data: any) {
    return await loanFetcher(`${LOAN_ENDPOINT}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: getJSONHeaders(),
    });
}