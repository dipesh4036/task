'use client'
import { useState, useEffect } from "react";
import Herosection from "@/components/Herosection";
import SignInForm from '@/app/sign-in/page'
import Navbar from "@/components/Navbar";

export default function Home() {
  const [user, setUser] = useState(null);

  // Simulate fetching user data or check if the user is logged in
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user");
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        setUser(null);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white text-black">
      <div className="flex-1 md:mt-5">
        {/* If user is logged in, show Herosection */}
        {user ? (
          <>
      <Navbar className="md:w-[18%] w-full" />
          <Herosection />
          </>
        ) : (
          // If user is not logged in, show the Login component (sign-in page)
          <SignInForm />
        )}
      </div>
    </div>
  );
}
