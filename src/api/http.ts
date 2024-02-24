export const walletFetcher = async <T>(url: string, options?: RequestInit | {}): Promise<Response> => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_WALLET_BASE_URL}/${url}`, options);
};

export const adminFetcher = async <T>(url: string, options?: RequestInit | {}): Promise<Response> => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN_BASE_URL}/${url}`, options);
};

export const transactionFetcher = async <T>(url: string, options?: RequestInit | {}): Promise<Response> => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_WALLET_BASE_URL}/${url}`, options);
};