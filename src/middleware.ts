import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('authUserToken');
    const expirationTime = request.cookies.get('expires');

    if (currentUser) {
        const currentTime = new Date();
        const expirationDate = new Date(expirationTime);
        if (currentTime > expirationDate) {
            request.cookies.delete('authUserToken');
            request.cookies.delete('expires');
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            return NextResponse.next();
        }
    } else {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: [
        '/admins',
        '/agents',
        '/customers',
        '/kyc',
        '/lenders',
        '/loans',
        '/overview',
        '/reports',
        '/reports',
        '/settings',
        '/transactions',
    ],
}