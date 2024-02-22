import {walletFetcher} from "@/api/http";
import {downloadFile} from "@/utils/helpers";

export async function disburse(type: string = 'single', authToken?: string, data?: object) {
    let requestBody: Record<string, string> | FormData | string | undefined;
    let requestHeaders: Record<string, string> = {'Authorization': `Bearer ${authToken}`};
    const bulkRequestBody = new FormData()

    if (type === 'bulk') {
        if (data && typeof data === 'object') Object.entries(data).forEach(([key, value]) => {
            bulkRequestBody.append(key, value instanceof Blob ? value : String(value));
        });
    } else {
        requestBody = JSON.stringify(data);
        requestHeaders['Content-Type'] = 'application/json';
    }

    return await walletFetcher(`api/v1/merchants/${type}-disbursements`, {
        method: 'POST',
        headers: {...requestHeaders},
        body: type === 'bulk' ? bulkRequestBody : requestBody
    });
}


export async function downloadBulkDisbursementTemplate(authToken: string = '') {
    const response = await walletFetcher('api/v1/files/download/bulk-disbursement-template', {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Disposition': 'attachment; filename=bulkDisbursementTemplate.xlsx',
            'Content-Type': 'application/octet-stream',
        },
    });

    await downloadFile(response, 'bulk-disbursement-template.csv')
}