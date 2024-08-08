import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // Set your secret here
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
          headers: { "Content-Type": "application/json" }
        });

        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',  // Custom login page
  },
});
