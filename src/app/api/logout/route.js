// pages/api/logout.js
import { NextResponse } from "next/server";

export async function POST(request) {
  // Set the token cookie to expire immediately to log the user out
  const response = NextResponse.json({ message: "Logged out successfully" });
  
  // Clear the token cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/sign-in",
    expires: new Date(0), // Expire immediately
  });

  return response;
}
