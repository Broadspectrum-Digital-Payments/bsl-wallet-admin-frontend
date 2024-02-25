import {walletFetcher, adminFetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";

export async function createPassword(password: string, confirmPassword: string, authToken: string | undefined) {
    return await walletFetcher('api/auth/create-password', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, confirmPassword})
    });
}

export async function login(email: string | undefined, password: string | undefined, authType: string | undefined) {
    return authType === 'admin' ? await adminFetcher('v1/login', {
            method: 'POST',
            headers: getJSONHeaders(),
            body: JSON.stringify({email, password})
        })
        : await walletFetcher('v1/lenders/login', {
            method: 'POST',
            headers: getJSONHeaders(),
            body: JSON.stringify({email, password})
        });
}

export async function logout(jwtToken: string | undefined) {
    return await adminFetcher('api/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        },
    });
}

export async function updatePassword(currentPassword: string, newPassword: string, authToken: string | undefined) {
    return await adminFetcher('api/auth/update-password', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({currentPassword, newPassword})
    });
}

export async function sendResetEmailLink(email: string = '') {
    return await walletFetcher('api/auth/request-reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    });
}

export async function resetPassword(password: string = '', token: string | null) {
    return await adminFetcher('v1/reset-password', {
        method: 'POST',
        headers: getJSONHeaders(),
        body: JSON.stringify({password, token})
    });
}