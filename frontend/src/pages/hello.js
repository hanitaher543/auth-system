import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Hello() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (replace with your own authentication logic)
    const isAuthenticated = true; // Replace this with your actual authentication check

    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      router.push('/login'); // Change '/login' to your login page path
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Hello World!</h1>
    </div>
  );
}
