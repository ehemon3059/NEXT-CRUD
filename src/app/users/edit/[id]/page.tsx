// app/users/edit/[id]/page.tsx
import { getUserById } from "../../../actions";
import { EditUserForm } from "../../../components/edit-user-form";
import Link from "next/link";

export default async function EditUserPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const user = await getUserById(Number(id));

  // ✅ Improved error UI
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
              <h2 className="text-xl font-bold text-red-600">User Not Found</h2>
              <p className="text-sm text-gray-600">ID: {id}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            The user you're looking for doesn't exist or may have been deleted.
          </p>
          <Link
            href="/users"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            ← Back to Users
          </Link>
        </div>
      </div>
    );
  }

  // ✅ No more type conversion! Keep everything as numbers
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <EditUserForm 
        user={{ 
          id: user.id,           // ✅ Keep as number
          name: user.name ?? "", // ✅ Handle null
          email: user.email      // ✅ Email is always string
        }} 
      />
    </div>
  );
}

// Optional: Add metadata
export const metadata = {
  title: "Edit User | User Management",
  description: "Edit and update user details",
};