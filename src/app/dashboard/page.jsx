'use client'
import Herosection from '@/components/Herosection';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl bg-white text-black">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{`Error: ${error}`}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white text-black">
      <Navbar className="md:w-[18%] w-full" />
      <div className="flex-1 md:mt-5">
        <Herosection />
      </div>
    </div>
  );
};

export default DashboardPage;
