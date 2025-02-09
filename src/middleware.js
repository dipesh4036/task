import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // If the route is not related to authentication (sign-up, sign-in)
    if (pathname.startsWith('/api/auth') || pathname.startsWith('/sign-up') || pathname.startsWith('/sign-in')) {
        return NextResponse.next(); // No authentication needed for these routes
    }

    // Protect the dashboard route
    if (pathname.startsWith('/dashboard')) {
        // Extract token from cookies
        const token = request.cookies.get('token')?.value; // Using the cookies API provided by Next.js

        console.log('Token from cookies:', token); // Debugging: log the token

        // Verify the token
        const verified = await verifyToken(token);
        if (!verified) {
            console.log('Invalid token or no token found. Redirecting to sign-in.'); // Debugging
            // Redirect to sign-in if the user is not authenticated
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    return NextResponse.next();
}

// Define middleware to run on specific routes
export const config = {
    matcher: ['/dashboard', '/sign-up', '/sign-in'], // This will match dynamic routes too like /dashboard/123
};