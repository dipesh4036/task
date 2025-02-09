import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbConnect from "@/lib/dbconnect";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect(); // Connect to the database

    try {
        const { username, password } = await request.json(); 

        if (!username || !password) {
            return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
        }

        // Query the database for the user
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || "SECRET_KEY",
            { expiresIn: '1h' } // Token will expire in 1 hour
        );

        // Set the token in the cookies for the user
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
            sameSite: 'Strict',
            path: '/',
            maxAge: 60 * 60 * 1000, // 1 hour
        };

        const serializedCookie = serialize('token', token, cookieOptions);
        const response = NextResponse.json({
            message: 'Login successful!',
            token
        }, { status: 200 });

        // Attach the cookie to the response
        response.headers.set('Set-Cookie', serializedCookie);

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
