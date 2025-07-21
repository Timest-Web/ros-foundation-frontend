import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// --- MOCK USER DATABASE ---
// In a real app, you'd fetch this from your database.
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@test.com",
    password: "password",
    role: "admin",
  },
  {
    id: "2",
    name: "Beneficiary User",
    email: "ben@test.com",
    password: "password",
    role: "beneficiary",
  },
  {
    id: "3",
    name: "Child User",
    email: "child@test.com",
    password: "password",
    role: "children",
    lastName: "Alaba",
    firstName: "Pablo",
    parentPhone: "08064214744",
  },
];
// --------------------------

export const authOptions: NextAuthOptions = {
  providers: [
    // --- Provider for Admins ---
    CredentialsProvider({
      id: "admin-credentials", // Unique ID for this provider
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is where you'd call your real backend API
        // For now, we'll use our mock database
        const user = users.find(
          (u) => u.email === credentials?.email && u.role === "admin"
        );

        // Simple password check (in real life, use bcrypt.compare)
        if (user && user.password === credentials?.password) {
          // Return the user object, but OMIT the password
          // The 'role' is the most important part here
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        // Return null if user not found or password doesn't match
        return null;
      },
    }),

    // --- Provider for Beneficiaries ---
    CredentialsProvider({
      id: "beneficiary-credentials", // Unique ID
      name: "Beneficiary Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) => u.email === credentials?.email && u.role === "beneficiary"
        );
        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      },
    }),

    // --- Provider for Children ---
    CredentialsProvider({
      id: "children-credentials", // Unique ID
      name: "Children Credentials",
      credentials: {
        // You might use a phone number or a different identifier here
        parentPhone: { label: "parentPhone", type: "text" },
        firstName: { label: "firstName", type: "text" },
        lastName: { label: "lastName", type: "text" },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.parentPhone === credentials?.parentPhone && u.role === "children"
        );
        if (user && user.firstName === credentials?.firstName) {
          return {
            id: user.id,
            name: user.firstName,
            lastName: user.lastName,
            parentPhone: user.parentPhone,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],

  // We need to define callbacks to attach the role to the session token
  callbacks: {
    // The JWT callback is called first, whenever a JWT is created or updated.
    // We are adding the 'role' to the token here.
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    // The session callback is called next, whenever a session is accessed.
    // We are adding the 'role' to the session object from the token,
    // so it's available on the client-side.
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt", // We must use JWT to use the callbacks
  },

  pages: {
    // If a user is not authenticated, they will be redirected to the relevant sign-in page.
    // Middleware will handle this more gracefully, but it's good practice to set these.
    signIn: "/ros/admin/signin", // Default sign-in, but we'll override this.
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
