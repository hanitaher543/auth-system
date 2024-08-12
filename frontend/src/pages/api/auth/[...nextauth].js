import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log('Credentials:', credentials); // Log credentials
    
        const res = await fetch(`${process.env.NEXTAUTH_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
        });
    
        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Error: ${res.status} - ${res.statusText}`);
            console.log('Error Response:', errorText);
            return null;
        }
    
        const user = await res.json();
        console.log('User Response:', user); // Log user response
    
        if (user) {
            return user; // Return the user object
        }
    
        return null; // Return null for invalid credentials
    }
    ,
    }),
  ],
  pages: {
    signIn: '/login',  // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the access token to the JWT
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Add access token to session
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
