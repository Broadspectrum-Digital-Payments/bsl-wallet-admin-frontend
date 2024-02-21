import {fetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";

const ADMIN_ENDPOINT = 'api/v1/admins'

export async function listAdmins(bearerToken: string = '', params: string = '') {
    return await fetcher(`${ADMIN_ENDPOINT}?${params}`, {
        headers: getJSONHeaders(bearerToken)
    });
}

export async function storeAdmin(bearerToken?: string, data?: object) {
    return await fetcher(`${ADMIN_ENDPOINT}`, {
        method: 'POST',
        headers: getJSONHeaders(bearerToken),
        body: JSON.stringify(data)
    });
}

export async function showAdmin(bearerToken?: string, externalId?: object) {
    return await fetcher(`${ADMIN_ENDPOINT}/${externalId}`, {
        headers: getJSONHeaders(bearerToken)
    });
}

export async function updateAdmin(bearerToken?: string, data?: object) {
    return await fetcher(`${ADMIN_ENDPOINT}`, {
        method: 'PUT',
        headers: getJSONHeaders(bearerToken),
        body: JSON.stringify(data)
    });
}
