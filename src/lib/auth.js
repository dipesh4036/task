import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "SECRET_KEY");

export const verifyToken = async (token) => {
    try {
        // Log token to check if it is being passed correctly
        console.log('Verifying token:', token);

        const { payload } = await jwtVerify(token, JWT_SECRET);

        // Check if the token has expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (payload.exp && payload.exp < currentTime) {
            console.log('Token has expired.');
            return null; // Token is expired
        }

        // Log the decoded payload to see its contents
        console.log('Decoded token payload:', payload);

        return payload; // Return the payload if verification is successful
    } catch (error) {
        console.error('Token verification failed:', error);
        return null; // Invalid token
    }
};
