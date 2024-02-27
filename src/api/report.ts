import {loanFetcher, walletFetcher} from "@/api/http";
import {downloadFile, getJSONHeaders} from "@/utils/helpers";

const REPORT_ENDPOINT = 'v1/admin/dashboard'

export async function listReports(params: string = '') {
    return await walletFetcher(`${REPORT_ENDPOINT}?${params}`, {
        headers: getJSONHeaders(),
    });
}

export async function downloadLoans(params: string = '', fileName: string = 'loanReport.csv') {
    const response = await walletFetcher(`v1/admin/reports/loans/download?${params}`, {
        headers: getJSONHeaders(),
    });

    return await downloadFile(response, fileName)
}
