import {lenderFetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";


const LENDERS_ENDPOINT = 'v1/admin/users'

export async function listLenders(bearerToken: string = '', params: string = '') {
    return await lenderFetcher(`${LENDERS_ENDPOINT}?type=user&${params}`, {
        headers: getJSONHeaders(bearerToken),
    });
}