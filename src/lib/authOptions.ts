// lib/authOptions.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) => u.email === credentials?.email && u.role === "admin"
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
    CredentialsProvider({
      id: "beneficiary-credentials",
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
    CredentialsProvider({
      id: "children-credentials",
      name: "Children Credentials",
      credentials: {
        parentPhone: { label: "Parent Phone", type: "text" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.parentPhone === credentials?.parentPhone &&
            u.role === "children"
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/ros/admin/signin",
  },
};
