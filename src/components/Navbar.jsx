'use client'
import React, { useState, useEffect } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { RiCloseLargeFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fetch user data
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

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Successfully logged out, redirect or update state
        setUser(null);
        router.push("/sign-in"); // Redirect to the homepage or login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <div className="h-fit md:min-h-screen w-full md:w-[18%] flex flex-col text-black bg-white shadow-lg border-r border-gray-300">
      <div className="p-5 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <button 
          className="md:hidden p-2 text-3xl rounded focus:outline-none" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <RiCloseLargeFill /> : <HiOutlineBars3BottomRight />}
        </button>
      </div>

      {/* Show logo and username if user is logged in */}
      {user ? (
        <div className="p-5 flex flex-col items-center space-y-3">
          <img src="https://www.bootdey.com/img/Content/avatar/avatar7.png" alt="Logo" className="w-16 h-16 rounded-full" />
          <p className="text-lg font-semibold">Hii 👋  {user.username}</p>
          <button 
            onClick={handleLogout} 
            className="mt-3 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="p-5 flex justify-center">
          <img src="/path-to-your-logo.png" alt="Logo" className="w-16 h-16" />
        </div>
      )}

      <ul className={`mt-4 space-y-3 p-3 ${isMobileMenuOpen ? "block" : "hidden"} ${isMobileMenuOpen ? "bg-gray-600 text-white" : ""} md:block`}>
        <li className="hover:bg-purple-200 p-2 rounded transition duration-200 cursor-pointer">Video</li>
        <li className="hover:bg-purple-200 p-2 rounded transition duration-200 cursor-pointer">Stories</li>
        <li className="hover:bg-purple-200 p-2 rounded transition duration-200 cursor-pointer">Music</li>
        <li className="hover:bg-purple-200 p-2 rounded transition duration-200 cursor-pointer">Podcasts</li>
      </ul>
    </div>
  );
};

export default Navbar;
