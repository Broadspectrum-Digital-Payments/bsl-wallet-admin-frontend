import {adminFetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";

const ADMIN_ENDPOINT = 'v1/admins'

export async function listAdmins(bearerToken: string = '', params: string = '') {
    return await adminFetcher(`${ADMIN_ENDPOINT}?${params}`, {
        headers: getJSONHeaders(bearerToken)
    });
}

export async function storeAdmin(bearerToken?: string, data?: object) {
    return await adminFetcher(`${ADMIN_ENDPOINT}`, {
        method: 'POST',
        headers: getJSONHeaders(bearerToken),
        body: JSON.stringify(data)
    });
}

export async function showAdmin(bearerToken?: string, externalId?: string) {
    return await adminFetcher(`${ADMIN_ENDPOINT}/${externalId}`, {
        headers: getJSONHeaders(bearerToken)
    });
}

export async function updateAdmin(bearerToken?: string, externalId?: string, data?: object) {
    return await adminFetcher(`${ADMIN_ENDPOINT}/${externalId}`, {
        method: 'PUT',
        headers: getJSONHeaders(bearerToken),
        body: JSON.stringify(data)
    });
}
