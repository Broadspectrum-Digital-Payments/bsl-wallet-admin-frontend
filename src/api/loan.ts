import {walletFetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";

const TRANSACTION_ENDPOINT = 'v1/admin/transactions'

export async function listLoans(params: string = '') {
    return await walletFetcher(`${TRANSACTION_ENDPOINT}?${params}`, {
        headers: getJSONHeaders(),
    });
}