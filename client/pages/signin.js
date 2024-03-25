import React, { useState } from 'react';
import { auth } from './firebase/firebase';

const SigninPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in the user with email and password
      await auth.signInWithEmailAndPassword(username, password);
      console.log('Signin successful');
      // Optionally, you can redirect the user to another page or show a success message
    } catch (error) {
      console.error('Signin error:', error);
      setError(error.message);
      // Handle signin error (e.g., display an error message)
    }
  };

  return (
    <div className="container flex justify-center items-center h-screen mt-24">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 border border-gray-300 rounded bg-blue-500 hover:bg-blue-600 text-black"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;