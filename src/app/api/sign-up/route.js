import dbConnect from "@/lib/dbconnect";
import User from "@/models/usermodel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect(); // Connect to the database

  try {
    // Extract data from request body
    const { username, email, password } = await request.json();

    // Check if the email is already registered
    const userCheckByEmail = await User.findOne({ email });
    if (userCheckByEmail) {
      return NextResponse.json(
        {
          message: "User  already registered with this email.",
        },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save new user to the database
    await newUser.save();

    // Return success response
    return NextResponse.json({
      message:
        "User  registered successfully. Please check your email for verification.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
