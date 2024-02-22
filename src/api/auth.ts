import {fetcher} from "@/api/http";
import {getJSONHeaders} from "@/utils/helpers";

export async function verifyEmailLink(token: string | null) {
    return await fetcher(`api/auth/verify-email-link?token=${token}`);
}

export async function verifyOtp(accessKey: string | undefined, otp: string) {
    return await fetcher('api/auth/verify-otp', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({accessKey, otp})
    });
}

export async function verifyPasswordResetOtp(accessKey: string | null, otp: string) {
    return await fetcher('api/auth/reset-password/verify-otp', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({accessKey, otp})
    });
}

export async function createPassword(password: string, confirmPassword: string, authToken: string | undefined) {
    return await fetcher('api/auth/create-password', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, confirmPassword})
    });
}

export async function resendOtp(accessKey: string | undefined) {
    return await fetcher(`api/v1/auth/resend-otp?accessKey=${accessKey}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

export async function login(email: string | undefined, password: string | undefined) {
    return await fetcher('v1/login', {
        method: 'POST',
        headers: getJSONHeaders(),
        body: JSON.stringify({email, password})
    });
}

export async function logout(jwtToken: string | undefined) {
    return await fetcher('api/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        },
    });
}

export async function updatePassword(currentPassword: string, newPassword: string, authToken: string | undefined) {
    return await fetcher('api/auth/update-password', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({currentPassword, newPassword})
    });
}

export async function sendResetEmailLink(email: string = '') {
    return await fetcher('api/auth/request-reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    });
}

export async function resetPassword(password: string, accessKey: string | undefined) {
    return await fetcher('api/auth/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, accessKey})
    });
}

