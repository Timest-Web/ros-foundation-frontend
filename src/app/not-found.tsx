"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-primary-100 mb-4">404</h1>
      <p className="text-2xl mb-4 font-plus_jakarta_sans text-text-dark">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="text-primary-100 underline">
        Go back home
      </Link>
    </div>
  );
}
