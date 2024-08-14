import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import { signIn,getSession } from 'next-auth/react';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const router                  = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
  
    console.log(result); // Ajoutez ce log pour voir la structure de `result`
  
    if (result?.error) {
      console.error('Login failed:', result.error);
      setError('Login failed. Please try again.');
    } else {
      // Maintenant, récupérez la session pour obtenir le token
      const session = await getSession(); // Importez getSession depuis 'next-auth/react'
  
      if (session) {
        localStorage.setItem('token', session.token); // Récupérez le token de la session
        localStorage.setItem('email', email);
  
        // Redirect to the Hello World page on success
        router.push('/hello');
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
