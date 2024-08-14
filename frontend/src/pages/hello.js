import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Hello() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token) {
      // Redirect to the login page if not authenticated
      router.push('/login');
    } else {
      // Set the email and token state
      setToken(token);
      setEmail(email);
    }
  }, [router]);

return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold">Hello World!</h1> 
    <p className="text-sm font-bold mt-4">Your email: {email}</p> {/* Ajout d'une marge supérieure */}
  </div>
);
}
