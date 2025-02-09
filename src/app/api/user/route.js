import { verifyToken } from '@/lib/auth'; // Import verifyToken to decode JWT
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Manually get the cookie from headers
    const cookieHeader = request.headers.get('cookie');
    console.log('Cookie Header:', cookieHeader);

    // Parse the token from the cookie header
    const token = cookieHeader
      ? cookieHeader.split(';').find(c => c.trim().startsWith('token='))
      : undefined;

    // If token exists, remove the "token=" part and trim it
    const tokenValue = token ? token.split('=')[1] : undefined;
    console.log('Token value:', tokenValue);

    // If no token, return unauthorized response
    if (!tokenValue) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    // Wait for the token to be verified
    const decodedToken = await verifyToken(tokenValue);

    // If the token is invalid or decoding fails
    if (!decodedToken) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Return user data (e.g., username)
    return NextResponse.json({
      message: 'Successfully accessed the dashboard',
      username: decodedToken.username,
      userId: decodedToken.userId,
    });
  } catch (error) {
    console.error('Error in /api/user:', error);  // Add detailed error logging
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
