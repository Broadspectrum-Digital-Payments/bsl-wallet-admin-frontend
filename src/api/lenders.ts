import {walletFetcher, loanFetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";

const LENDERS_ENDPOINT = 'v1/admin/users'

export async function listLenders(params: string = '') {
    return await walletFetcher(`${LENDERS_ENDPOINT}?${params}`, {
        method: 'GET',
        headers: getJSONHeaders(),
    });
}

export async function storeLender(data: object) {
    return await walletFetcher(`v1/lenders/register`, {
        headers: getJSONHeaders(),
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export async function showLender(bearerToken: string = '', lenderExternalId: string) {
    return await walletFetcher(`${LENDERS_ENDPOINT}/${lenderExternalId}`, {
        headers: getJSONHeaders(bearerToken),
    });
}

export async function updateLender(bearerToken: string = '', lenderExternalId: string, data: object) {
    return await walletFetcher(`${LENDERS_ENDPOINT}/${lenderExternalId}`, {
        headers: getJSONHeaders(bearerToken),
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export async function listLenderLoans(externalId?: string, params: string = '') {
    return await loanFetcher(`v1/lenders/${externalId}/loans?${params}`, {
        headers: getJSONHeaders(),
        method: 'GET',
    });
}