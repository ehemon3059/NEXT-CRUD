// app/users/page.tsx
// ✅ NO "use client" - This is a Server Component!

import Link from "next/link";
import { getAllUsers } from "../actions";
import UsersTableClient from "./users-table-client";
import { Suspense } from "react";

// Loading component for Suspense boundary
function TableSkeleton() {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <div className="h-8 bg-gray-200 rounded w-48 mb-6 mx-auto animate-pulse"></div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex justify-between">
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Server Component - async function, data fetched on server
export default async function UsersPage() {
  // Fetch data on the server - this runs before the page renders
  let users;
  let error = null;

  try {
    users = await getAllUsers();
    
    // Transform the data to ensure all fields are present
    const transformedUsers = users.map((user) => ({
      id: user.id,
      name: user.name ?? "",
      email: user.email,
    }));

    return (
      <div className="flex items-center justify-center min-h-screen drop-shadow-2xl">
        <Suspense fallback={<TableSkeleton />}>
          <UsersTableClient initialData={transformedUsers} />
        </Suspense>
      </div>
    );
  } catch (err) {
    console.error("Error loading users:", err);
    error = err;
  }

  // Error state - shown if data fetching fails
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl border border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Error Loading Users
              </h2>
              <p className="text-sm text-gray-600">
                We couldn't fetch the user data
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            There was a problem connecting to the database. Please try again
            later.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Retry
            </button>
            <Link
              href="/"
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition text-center"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // This should never be reached, but TypeScript needs it
  return null;
}

// Optional: Add metadata for SEO
export const metadata = {
  title: "All Users | User Management",
  description: "View and manage all registered users",
};

// Optional: Revalidate this page every 60 seconds
export const revalidate = 60;