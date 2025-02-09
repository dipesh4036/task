'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Button from '@/components/Button'; // Ensure you have a Button component

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(event.target);
    console.log(data.get('username'));
    const userData = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await axios.post('/api/sign-up', userData);
      toast.success(response.data.message); 

      // Redirect to login page after successful sign-up
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error during sign-up:', error);
      toast.error('There was a problem with your sign-up. Please try again.'); // Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            AI-Generated Content
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
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
            <label htmlFor="email" className="mb-2 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              required
            />
          </div>

          <Button bgColor='bg-purple-400' textColor='text-white' type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : 'Sign Up'}
          </Button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}