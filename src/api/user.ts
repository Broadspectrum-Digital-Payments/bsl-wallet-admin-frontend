import {walletFetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";

const USER_ENDPOINT = 'v1/admin/users'

export async function listUsers(params: string = '') {
    return await walletFetcher(`${USER_ENDPOINT}?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Admin-Header': 'bsl-wallet-admin',
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors'
    });
}

export async function showUser(bearerToken?: string, externalId?: object) {
    return await walletFetcher(`${USER_ENDPOINT}/${externalId}`, {
        headers: getJSONHeaders(bearerToken)
    });
}

export async function updateUser(data?: object) {
    return await walletFetcher(`${USER_ENDPOINT}`, {
        method: 'PUT',
        headers: getJSONHeaders(),
        body: JSON.stringify(data)
    });
}
