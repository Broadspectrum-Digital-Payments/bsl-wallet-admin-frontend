export const fetcher = async <T>(url: string, options?: RequestInit | {}): Promise<Response> => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`, options);
};
