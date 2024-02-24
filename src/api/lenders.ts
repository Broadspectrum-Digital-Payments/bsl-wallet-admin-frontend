import {lenderFetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";


const LENDERS_ENDPOINT = 'v1/admin/users'

export async function listLenders(bearerToken: string = '', params: string = '') {
    return await lenderFetcher(`${LENDERS_ENDPOINT}?type=lender&${params}`, {
        headers: getJSONHeaders(bearerToken),
    });
}

export async function showLender(bearerToken: string = '', lenderExternalId: string) {
    return await lenderFetcher(`${LENDERS_ENDPOINT}/${lenderExternalId}`, {
        headers: getJSONHeaders(bearerToken),
    });
}

export async function updateLender(bearerToken: string = '', lenderExternalId: string, data: object) {
    return await lenderFetcher(`${LENDERS_ENDPOINT}/${lenderExternalId}`, {
        headers: getJSONHeaders(bearerToken),
        method: 'PUT',
        body: JSON.stringify(data)
    });
}