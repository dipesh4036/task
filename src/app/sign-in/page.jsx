'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Button from '@/components/Button'; // Ensure you have a Button component
import axios from 'axios'; // Axios for sending HTTP requests
import Cookies from 'js-cookie'; // Import js-cookie

export default function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Send POST request to your backend API for authentication
      const response = await axios.post('/api/sign-in', {
        username: username, // Send username
        password: password, // Send password
      });

      // Check if authentication was successful
     
        // Set the token in a cookie
        Cookies.set('token', response.data.token, { expires: 1 }); // Set token with 1 day expiration
        toast.success('Successfully logged in!');
        router.replace('/dashboard'); // Redirect to the dashboard after successful login
    
    } catch (error) {
      toast.error('Incorrect username or password'); // Show error message on failure
    }

    setIsSubmitting(false); // Reset the submitting state
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to AI-Generated Content
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2 font-medium">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button bgColor='bg-purple-400' textColor='text-white' className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : 'Sign In'}
          </Button>
        </form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}