import {walletFetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";

const USER_ENDPOINT = 'v1/admin/users'

export async function listUsers(params: string = '') {
    return await walletFetcher(`${USER_ENDPOINT}?${params}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Admin-Header': 'bsl-wallet-admin',
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
}

export async function showUser(bearerToken?: string, externalId?: string) {
    return await walletFetcher(`${USER_ENDPOINT}/${externalId}`, {
        headers: getJSONHeaders(bearerToken)
    });
}

export async function updateUser(externalId: string = '', data?: object) {
    return await walletFetcher(`${USER_ENDPOINT}/${externalId}`, {
        method: 'PUT',
        headers: getJSONHeaders(),
        body: JSON.stringify(data)
    });
}