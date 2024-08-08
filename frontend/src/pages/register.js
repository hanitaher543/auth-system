import { useState } from 'react';
import 'tailwindcss/tailwind.css';

export default function Register() {
  const [fullName, setFullName]             = useState('');
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          fullName, 
          email, 
          password 
        }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        alert('An error occurred while registering. Please try again.');
        return;
      }
  
      const data = await res.json(); // Ensure the response is valid JSON
  
      // Handle successful registration here
      alert('Registration successful! Welcome, ' + data.fullName); 
      router.push('/login'); // Redirect after successful registration
  
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Repeat Password</label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
